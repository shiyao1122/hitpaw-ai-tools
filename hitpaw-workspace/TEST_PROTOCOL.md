# TEST PROTOCOL

## 1. Shadow Environment Test
- Ensure all API keys are loaded from environment variables.
- Verify that the server starts correctly in a development/test mode.

## 2. Regression Test
- Verify that the original image generation feature still works.
- Check that the input (birthDate) is still correctly handled.
- Ensure the Replicate call still returns a valid image URL.

## 3. Feature Test
- Verify that the "2026 Fortune Report" is generated after the image.
- Check that the report is approximately 300 words.
- Ensure the report is displayed on the UI below the image.

## 4. Error Handling
- Test with missing or invalid birthDate.
- Simulate API failures (OpenAI or Replicate) and ensure graceful error messages.
