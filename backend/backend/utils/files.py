import hashlib
import boto3
from django.conf import settings


def generate_filename(file) -> str:
    extension = "." + file.name.split(".")[-1]
    content = file.read()
    file.seek(0)
    md5_hash = hashlib.md5(content).hexdigest()
    filename = md5_hash + extension
    return filename


def upload_to_bucket(files, path=None, bucket=None) -> list[str]:
    if not isinstance(files, list):
        files = [files]
    region_name = settings.STORAGES["staticfiles"]["OPTIONS"]["region_name"]
    endpoint_url = settings.STORAGES["staticfiles"]["OPTIONS"]["endpoint_url"]
    custom_domain = settings.STORAGES["staticfiles"]["OPTIONS"]["custom_domain"]
    session = boto3.Session()
    client = session.client("s3", region_name=region_name, endpoint_url=endpoint_url)
    response = []
    for file in files:
        filename = generate_filename(file)
        if not path:
            path = filename
        else:
            path += filename
        client.upload_fileobj(file, bucket, path, ExtraArgs={"ACL": "public-read"})
        full_url = f"https://{custom_domain}/{path}"
        response.append(full_url)
    client.close()
    return response
