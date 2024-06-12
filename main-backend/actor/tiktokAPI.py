import requests
import json

def fetch_tiktok_data(username):


  # Base URL for user information
  user_url = f"https://www.tiktok.com/@{username}"

  # Make a request to get user information
  try:
    user_response = requests.get(user_url)
    user_response.raise_for_status()  # Raise an exception for non-2xx status codes
  except requests.exceptions.RequestException as e:
    print(f"Error getting user data: {e}")
    return None

  # Parse user information from HTML (basic scraping)
  user_info = {}
  for line in user_response.text.splitlines():
    if '{"user":{"' in line:
      try:
        user_data = json.loads(line[line.find('{"user":{"'):])
        user_info = user_data["user"]
        break  # Stop after finding user data
      except json.JSONDecodeError:
        pass  # Ignore parsing errors

  # Base URL for post details (replace HASHTAG with actual video ID)
  post_url = f"https://www.tiktok.com/api/v2/aweme/info?secUid={user_info.get('id', '')}&aid=HASHTAG"

  # Make a request to get post details (example for one video)
  try:
    post_response = requests.get(post_url)
    post_response.raise_for_status()
  except requests.exceptions.RequestException as e:
    print(f"Error getting post data: {e}")
    return None

  # Parse post details from JSON response
  post_info = {}
  try:
    post_data = post_response.json()
    post_info = post_data["awemeInfo"] if post_data.get("awemeInfo") else {}
  except json.JSONDecodeError:
    pass  # Ignore parsing errors

  # Combine user and post information
  data = {"user": user_info, "post": post_info}

  return data

if __name__ == "__main__":
  username = input("Enter TikTok username: ")
  data = fetch_tiktok_data(username)

  if data:
    print(f"Scraped data for {username}:")
    print(json.dumps(data, indent=4))
  else:
    print("Failed to scrape data.")
