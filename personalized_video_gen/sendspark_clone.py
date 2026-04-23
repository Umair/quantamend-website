import os
import time
import pandas as pd
from playwright.sync_api import sync_playwright
from moviepy import VideoFileClip, CompositeVideoClip, ImageClip, ColorClip, vfx
import moviepy.video.fx as vfx
from moviepy.video.VideoClip import VideoClip
import numpy as np

# Configuration
SHOW_VIRTUAL_MOUSE = False  # Set to False to hide the fake mouse cursor during recording

INPUT_DIR = "personalized_video_gen/input"
OUTPUT_DIR = "personalized_video_gen/output"
TEMP_DIR = "personalized_video_gen/temp"
LEADS_CSV = os.path.join(INPUT_DIR, "leads.csv")
AVATAR_VIDEO = os.path.join(INPUT_DIR, "avatar.mp4")

# Create directories if they don't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

def record_website(url, duration, output_path):
    """
    Records a website scrolling down and up using Playwright.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Record video of the session
        context = browser.new_context(
            viewport={'width': 1280, 'height': 720},
            record_video_dir=TEMP_DIR,
            record_video_size={'width': 1280, 'height': 720}
        )
        page = context.new_page()
        
        # Get video object to retrieve path later
        video_obj = page.video
        
        try:
            # We change networkidle to domcontentloaded or load to avoid hanging on slow trackers
            # We also increase the timeout for slower sites
            print("      ⏳ Waiting for page to load...")
            try:
                page.goto(url, wait_until="load", timeout=45000)
            except Exception as load_err:
                # If it times out on 'load', we can still try to continue since DOM might be ready
                print(f"      ⚠️ Page load warning: {str(load_err)}")
                
            # Extra wait for Javascript-heavy sites to finish animations/rendering
            time.sleep(3)
            
            # Calculate scroll distance
            total_height = page.evaluate("document.body.scrollHeight")
            viewport_height = 720
            max_possible_scroll = max(0, total_height - viewport_height)
            
            # Instead of scrolling the entire page super fast, we calculate a human-like
            # maximum scrolling speed (e.g., 600 pixels per second).
            human_speed_px_per_sec = 400 
            
            # Since we must go down and up within 'duration' seconds:
            down_duration = duration / 2.0
            capped_scroll_distance = min(max_possible_scroll, human_speed_px_per_sec * down_duration)
            
            verb = "with virtual mouse " if SHOW_VIRTUAL_MOUSE else ""
            print(f"      📜 Executing humanized chunked scroll {verb}(Distance: {capped_scroll_distance:.0f}px)...")
            
            # Javascript to execute a human-like staggered scroll with an optional mouse cursor
            js_scroll_script = """
            async ([totalDurationMs, scrollDist, showMouse]) => {
                return new Promise(resolve => {
                    let cursor = null;
                    if (showMouse) {
                        cursor = document.createElement('div');
                        cursor.style.width = '28px';
                        cursor.style.height = '28px';
                        cursor.style.position = 'fixed';
                        cursor.style.zIndex = '999999';
                        cursor.style.pointerEvents = 'none';
                        // Standard macOS cursor SVG
                        cursor.innerHTML = '<svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.1473 24.16L6.5 3.5L23.4727 15.6543L15.3444 16.925L10.1473 24.16Z" fill="black" stroke="white" stroke-width="2" stroke-linejoin="round"/></svg>';
                        document.body.appendChild(cursor);
                    }

                    // Keyframes for human-like behavior: pause -> scroll -> pause -> scroll -> pause...
                    // t = % of total time, y = % of target scroll distance
                    const keyframes = [
                        {t: 0.00, y: 0.0},
                        {t: 0.15, y: 0.0},  // pause at top
                        {t: 0.25, y: 0.4},  // scroll down
                        {t: 0.40, y: 0.4},  // pause
                        {t: 0.50, y: 1.0},  // scroll further down
                        {t: 0.65, y: 1.0},  // pause at bottom
                        {t: 0.75, y: 0.5},  // scroll up a bit
                        {t: 0.85, y: 0.5},  // pause
                        {t: 0.95, y: 0.0},  // scroll back to top
                        {t: 1.00, y: 0.0}
                    ];

                    function getScrollPosition(pct) {
                        let i = 0;
                        while(i < keyframes.length - 1 && pct > keyframes[i+1].t) i++;
                        if (i >= keyframes.length - 1) return keyframes[keyframes.length - 1].y * scrollDist;
                        
                        let kf1 = keyframes[i];
                        let kf2 = keyframes[i+1];
                        
                        let localPct = (pct - kf1.t) / (kf2.t - kf1.t);
                        // Smoothstep easing (ease-in-out cubic)
                        let ease = localPct < 0.5 ? 4 * localPct * localPct * localPct : 1 - Math.pow(-2 * localPct + 2, 3) / 2;
                        
                        return (kf1.y + (kf2.y - kf1.y) * ease) * scrollDist;
                    }

                    function getMousePosition(pct) {
                        const baseX = window.innerWidth * 0.65;
                        const baseY = window.innerHeight * 0.55;
                        // Organic drifting and slight bobbing
                        let x = baseX + Math.sin(pct * Math.PI * 4) * 60;
                        let y = baseY + Math.cos(pct * Math.PI * 6) * 40;
                        return {x, y};
                    }

                    let start = null;
                    function step(timestamp) {
                        if (!start) start = timestamp;
                        let progress = timestamp - start;
                        let pct = Math.min(progress / totalDurationMs, 1.0);
                        
                        window.scrollTo(0, getScrollPosition(pct));
                        
                        if (cursor) {
                            let pos = getMousePosition(pct);
                            cursor.style.left = pos.x + 'px';
                            cursor.style.top = pos.y + 'px';
                        }
                        
                        if (progress < totalDurationMs) {
                            window.requestAnimationFrame(step);
                        } else {
                            window.scrollTo(0, 0); 
                            if (cursor) cursor.remove();
                            resolve();
                        }
                    }
                    window.requestAnimationFrame(step);
                });
            }
            """
            
            # Run the javascript, this blocks until the promise resolves (exactly 'duration' seconds)
            page.evaluate(js_scroll_script, [duration * 1000, capped_scroll_distance, SHOW_VIRTUAL_MOUSE])
            
        finally:
            # Explicitly close context to finalize video immediately
            # This ensures the END of the video perfectly aligns with the END of the scroll
            context.close()
            browser.close()
        
        # Wait for file to appear on disk if necessary
        video_path = video_obj.path()
        if not video_path:
            raise Exception("Video path not available")
            
        # Move/Rename to our desired path
        if os.path.exists(video_path):
            if os.path.exists(output_path):
                os.remove(output_path)
            os.rename(video_path, output_path)
        else:
            raise Exception(f"Recorded video file not found at {video_path}")

def make_circular_mask(size):
    """
    Creates a circular mask for MoviePy.
    """
    w, h = size
    frame = np.zeros((h, w), dtype=float)
    center_x, center_y = w / 2, h / 2
    radius = min(w, h) / 2
    y, x = np.ogrid[:h, :w]
    dist_from_center = np.sqrt((x - center_x)**2 + (y - center_y)**2)
    frame[dist_from_center <= radius] = 1.0
    
    return ImageClip(frame, is_mask=True, duration=1)

def create_personalized_video(website_video_path, avatar_video_path, output_path):
    """
    Combines the website video and the avatar video into a Sendspark-like format.
    """
    # Load videos
    web_clip = VideoFileClip(website_video_path)
    avatar_clip = VideoFileClip(avatar_video_path)
    
    # Scale avatar to be roughly 1/4th of the height
    target_height = web_clip.h // 3.5
    avatar_clip = avatar_clip.resized(height=target_height)
    
    # Calculate dimensions for circular crop (make it square first)
    min_dim = min(avatar_clip.w, avatar_clip.h)
    avatar_clip = avatar_clip.cropped(
        x_center=avatar_clip.w/2, 
        y_center=avatar_clip.h/2, 
        width=min_dim, 
        height=min_dim
    )
    
    # Create circular mask
    mask = make_circular_mask((min_dim, min_dim))
    avatar_clip = avatar_clip.with_mask(mask)
    
    # Set position to bottom left with some padding
    padding = 30
    avatar_pos = (padding, web_clip.h - avatar_clip.h - padding)
    
    # Composite
    # The Playwright recording starts as soon as the page is created, meaning the first 
    # seconds are just the page loading (often white/blank). We need to grab the END of 
    # the video where the actual scrolling took place.
    final_duration = avatar_clip.duration
    actual_web_duration = web_clip.duration
    
    if actual_web_duration > final_duration:
        start_time = max(0, actual_web_duration - final_duration)
        web_clip = web_clip.subclipped(start_time, actual_web_duration)
    else:
        web_clip = web_clip.with_duration(final_duration)
    
    final_clip = CompositeVideoClip(
        [web_clip, avatar_clip.with_position(avatar_pos)],
        size=web_clip.size
    ).with_duration(final_duration)
    
    # Set audio from avatar
    if avatar_clip.audio is not None:
        final_clip = final_clip.with_audio(avatar_clip.audio)
    
    # Write result
    final_clip.write_videofile(output_path, codec="libx264", audio_codec="aac" if avatar_clip.audio else None)
    
    # Cleanup
    web_clip.close()
    avatar_clip.close()

def main():
    # Check if avatar video exists
    if not os.path.exists(AVATAR_VIDEO):
        print(f"\n❌ Error: Avatar video not found at {AVATAR_VIDEO}")
        print("Please place your 'avatar.mp4' in the 'personalized_video_gen/input' folder.")
        return

    # Load leads
    if not os.path.exists(LEADS_CSV):
        print(f"\n❌ Error: Leads CSV not found at {LEADS_CSV}")
        return
        
    print("\n📊 Loading leads from CSV...")
    leads = pd.read_csv(LEADS_CSV)
    print(f"✅ Loaded {len(leads)} leads.")
    
    # Get avatar duration
    temp_clip = VideoFileClip(AVATAR_VIDEO)
    duration = temp_clip.duration
    temp_clip.close()
    
    print(f"🎬 Detected avatar duration: {duration:.2f} seconds\n")

    for index, row in leads.iterrows():
        # Handle case sensitive headers or spaces in CSV
        # We try to find the best match for 'First Name', 'Last Name', and 'Website'
        first_name = row.get('First Name', row.get('first_name', 'Lead'))
        last_name = row.get('Last Name', row.get('last_name', ''))
        url = row.get('Website', row.get('website'))
        
        name = f"{first_name} {last_name}".strip()
        
        if not url or pd.isna(url):
            print(f"⏩ [Lead {index+1}] Skipping: {name} (reason: No URL found in CSV)")
            continue
            
        print(f"🚀 [Lead {index+1}/{len(leads)}] Processing: {name}")
        print(f"   🔗 URL: {url}")
        
        temp_web_video = os.path.join(TEMP_DIR, f"web_{index}.webm")
        final_output = os.path.join(OUTPUT_DIR, f"{name.replace(' ', '_')}_personalized.mp4")
        
        try:
            # 1. Record website
            print(f"   🎥 Step 1: Recording website browser (will take ~{duration:.1f}s)...")
            record_website(url, duration, temp_web_video)
            
            # 2. Combine videos
            print(f"   🎨 Step 2: Compositing circular avatar and website recording...")
            create_personalized_video(temp_web_video, AVATAR_VIDEO, final_output)
            
            print(f"   ✨ Success! Created: {final_output}")
            
            # 3. Cleanup temp website video
            if os.path.exists(temp_web_video):
                os.remove(temp_web_video)
                
        except Exception as e:
            print(f"   ❌ Failed to process {name}: {str(e)}")
        print("-" * 50)

if __name__ == "__main__":
    main()
