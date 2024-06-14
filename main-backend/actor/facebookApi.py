import json
import sys
from apify_client import ApifyClient

def fetch_facebook_data(page_url):
    # Initialize the ApifyClient with your API token
    client = ApifyClient("apify_api_0U5OqYUSm37AVv4s8nVCIvy5cVcmRN0BSkpd")
    
    # Prepare the Actor input
    run_input = {
        "directUrls": [page_url],
        "resultsType": "posts",
        "resultsLimit": 4,
        "searchType": "hashtag",  # Change this if needed
        "searchLimit": 1,          # Change this if needed
        "addParentData": False,
    }
    
    # Specify memory allocation (in megabytes)
    memory_mbytes = 2048
    
    # Run the Actor and wait for it to finish
    run = client.actor("shu8hvrXbJbY3Eb9W").call(run_input=run_input, memory_mbytes=memory_mbytes)
    
    # Fetch Actor results from the run's dataset
    results = []
    for item in client.dataset(run["defaultDatasetId"]).iterate_items():
        # Remove the latestComments field if it exists
        if 'latestComments' in item:
            del item['latestComments']
        results.append(item)
    
    # Save the results to a JSON file
    with open('Backend/facebook_result.json', 'w') as json_file:
        json.dump(results, json_file, indent=4)
    
    print("Results saved to Backend/facebook_result.json")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python fetchFacebook.py <page_url>")
        sys.exit(1)
    
    page_url = sys.argv[1]
    fetch_facebook_data(page_url)
