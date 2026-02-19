import os
import replicate

def generate_astrology_content(prompt, type="image"):
    replicate_api_token = os.environ.get("REPLICATE_API_TOKEN")
    if not replicate_api_token:
        raise ValueError("REPLICATE_API_TOKEN not set")
    
    client = replicate.Client(api_token=replicate_api_token)
    
    if type == "image":
        # Using model string instead of version to get the latest
        output = client.run(
            "prunaai/z-image-turbo",
            input={"prompt": prompt}
        )
        res = output[0] if isinstance(output, list) else output
        return str(res) # Convert FileOutput to string (URL)
    elif type == "video":
        # Using model string for Kling as well
        output = client.run(
            "kwaivgi/kling-v2.5-turbo-pro",
            input={"prompt": prompt}
        )
        return str(output) # Convert to string (URL)
    else:
        raise ValueError("Invalid type. Choose 'image' or 'video'.")
