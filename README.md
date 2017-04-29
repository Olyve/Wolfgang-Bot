## Notes for setting up the project
If you are setting this up for the first time, you need to add a directory called `secrets` and in that directory there should be a file named `secrets.js`. A script is included that will set up the directory and the file, but you still need to provide the keys & ids and export them. The script is called `secrets` and can be run by typing `npm secrets`. This JavaScript file should export the keys that are required for the bot to work. Currently the keys that are required are:
 - `sheep_tag_list_id`
 - `newsletter_list_id`
 - `mailchimp_api_key`
 - `discord_client_id`

 After these keys are added and exported from the correct file, the bot can be uploaded to the server where it will function as intended.
