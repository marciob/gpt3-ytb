from youtube_transcript_api import YouTubeTranscriptApi

# video id example
#  IG0J_ynkemI

def get_text(value):
    
    transcripts = YouTubeTranscriptApi.get_transcript(value)
    for transcript in transcripts:
        text = transcript["text"]
        start_time = transcript["start"]
        print(f'{text} ({start_time})')

