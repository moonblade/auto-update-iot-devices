# IOT Auto updater

### [Live Link](https://water-level-indicator-a555e.web.app/upload)

At some point, over engineering just comes naturally and thats just what you do. [Full writeup of journey till here](https://nisham.notion.site/Lessons-in-over-engineering-085efba7175c4c319988656270a336ad)

The reason I had till now made by iot devices as dumb as possible and then provided smartness externally via rpi or other servers is because it was a hassle to udpate the nodemcu devices.
To update the device I'd need to stop its functioning, plug it into my pc and then manually push an update it.

This is 2021, There has got to be a better solution than that, and one that would allow me to cut the rpi entirely out of the loop.

I read about ota updates for esp8266 (nodemcu iot devices I was using) and trusting the ota update library to just work, started on the frontend react portion to upload and tag a new binary. (This repo).

So this allows you to upload a binary file, it converts the binary into utf-8 string and takes the build version and build name of the compiled binary (Added at compile time by the arduino library with a constant added by me).
So once this build name and version is acquired, It uploads the binary to firebase storage. Then it updates rtdb stating that there is a new firmware version available.

The nodemcu devices, at their end, ping the firmware version and if they find a version mismatch, they will download the newer binary, install it and reboot.

Its easier said than done though as I was riddled with issues throughout the mini project. First, the upload to firebase storage just would not work, thinking it was an auth issue, removed all authorization requirements from the storage.
No dice. Then thinking that this might be some issue with react, tried rebuilding the entire code in html, js which is a plain stupid thing to do in any case. 
Thing is, when stackoverflow doens't know your error, you're bound to go through some stupid routes.
Anyway, eventually after a ton of experimentation, figured out that the issue was due to a unicode string being in the filename and that was messing up the getDownloadURL function in firebase storage.

So after wasting a couple of days on that error, then added auth during upload and updated the curresponding firebase entries, which went without a hitch.

Then I tried to actually get the ota updates to the device, Problems galore. The library I was planning to use was only available on esp32, not esp8266, the one I was interested in.
So hunted around for another one and got elegantOTA, but this was a webserver modal (runs webserver on local network and you need to push updates to it) and not http modal where it can download its own updates from anywhere.
Eventually realized that the esp8266 library had its own ESPHttpUpdate header and functions which does the same thing.

I tried to do the thing based on docs online, ESPHttpUpdate.update(url). No dice, the library has updated since then, and needs an HttpClient parameter. But the error message only hints at two other options, the one that I needed, and it existed, was not shown as an option.
So I tried ESPHttpUpdate(httpClient, url). Nope, still doesn't work. At this point, I'm ready to go through the docs of esphttpmodule. The docs are no help, they state that https has issues AND DO NOT ELABORATE. Like wtf docs, You had one job.
So did the obvious next thing and replace httpClient with an httpClientSecure. With high hopes, I ran this, nope, still nothing. I realized that for httpClientSecure to work, you need to feed it the fingerprint of the site for it to do anything, else it will flat out reject the connection.
okay, you know what, I dont care about the certificates. I know the urls will only come from me. This is secure enough. So I just turn off security with httpClientSecure.setInsecure(). And tada it starts to work. Finally.

Finally happy with my creation, uploaded it to github, setup an action to auto build and put it on firebase hosting. With that done, now I just need to manually update the devices once to be able to autoupdate them.

Sigh, its almost like I like to make things hard for myself.


