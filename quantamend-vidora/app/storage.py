import os
from google.cloud import storage

# Ensure we use the bucket specified in .env
BUCKET_NAME = os.getenv("GCS_BUCKET_NAME", "vidora-videos-cdn")

def upload_file_to_gcs(local_file_path: str, destination_blob_name: str) -> str:
    """Uploads a file to Google Cloud Storage and returns the public URL."""
    try:
        storage_client = storage.Client()
        bucket = storage_client.bucket(BUCKET_NAME)
        blob = bucket.blob(destination_blob_name)

        # Upload the file
        blob.upload_from_filename(local_file_path)

        # Uniform Bucket-Level Access handles making it public, no need for blob.make_public()

        return blob.public_url
    except Exception as e:
        print(f"Failed to upload to GCS: {e}")
        return None
