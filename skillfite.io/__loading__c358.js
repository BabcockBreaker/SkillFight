pc.script.createLoadingScreen(function (app) {
    // Create a new link element
    var splashImage = document.createElement('link');

    // Set the attributes for preloading
    splashImage.rel = 'preload';
    splashImage.href = 'https://skillfite.io/img/splash_new.jpg';
    splashImage.as = 'image';

    // Append the link element to the head
    document.head.appendChild(splashImage);
    document.body.style.backgroundColor = "#89CAD0";
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';

    // img will check when the preloaded splash image is loaded - and call showSplash
    const img = new Image();
    img.src = splashImage.href;

    img.onload = function() {
        // Function to call when the image has been loaded
        showSplash();

        // Display the page content
        document.body.style.opacity = '1';
    };

    var showSplash = function () {
        const FBSiteName = "facebook"
        const isOnFacebook = isOnSpecificHostname(FBSiteName);

        if(isOnFacebook) return;

        // Define an array of text strings to display
        var textArr = [
            "~  The further you travel, the more dangerous it gets...  ~",
            "~  The Fish Merchant will you give you fish for your wares!  ~",
            "~  Unable to kill a monster by yourself? Ask other players for help!  ~",
            "~  You can chat with other players by pressing 'Enter'  ~",
            "~  The best way to climb the leaderboards is to defeat other players!  ~",
            "~  Your regular weapon isn't hitting hard enough? Try crafting the heavy version!  ~",
            "~  Dashing (SPACE or RMB) moves your character in the direction of your cursor  ~",
            "~  Eating fish is the fastest way to heal mid-battle!  ~",
            "~  Safe zones move around - try to learn their patterns!  ~",
            "~  Fish are food, not friends  ~",
            "~  Higher tier gear may require both metal and wood materials  ~",

        ];

        // splash wrapper
        var wrapper = document.createElement('div');
        wrapper.id = 'application-splash-wrapper';
        //early on, show background color change.
        wrapper.style.backgroundColor = "#89CAD0";

        document.body.appendChild(wrapper);

        // splash
        var splash = document.createElement('div');
        splash.id = 'application-splash';
        wrapper.appendChild(splash);
        splash.style.display = 'block';
        splash.style.width = '100vw'; // Full viewport width
        splash.style.height = '100vh'; // Full viewport height
        splash.style.backgroundImage = 'url(https://skillfite.io/img/splash_new.jpg)';
        splash.style.backgroundSize = 'cover';
        splash.style.backgroundPosition = 'center center';
        splash.style.backgroundRepeat = 'no-repeat';

        //show logo first
        var logo = document.createElement('img');
        logo.src = "https://skillfite.io/img/logo.png";//;app.assets.find('sf_logo_med.png', 'texture').getFileUrl();
        splash.appendChild(logo);

        //dont show splash if on FB games - as FB will overwrite it anyways
        splash.style.backgroundImage = 'url(https://skillfite.io/img/splash_new.jpg)';

        var container = document.createElement('div');
        container.id = 'progress-bar-container';
        splash.appendChild(container);

        var bar = document.createElement('div');
        bar.id = 'progress-bar';
        container.appendChild(bar);

        // Create a text element to display the loading message
        var textElement = document.createElement('div');
        textElement.id = 'loading-text';

        //remove loading text for now - replace in future with images/tutorials
        // textElement.innerHTML = textArr[Math.floor(Math.random() * textArr.length)]; // Set initial text
        // splash.appendChild(textElement);

        // Define a function to update the loading message
        var updateText = function () {
            var newText = textArr[Math.floor(Math.random() * textArr.length)];
            textElement.innerHTML = newText;
        };

        // Call updateText() every 10 seconds
        setInterval(updateText, 10000);
    };

    var hideSplash = function () {
        const splash = document.getElementById('application-splash-wrapper');
        if(splash) splash.parentElement.removeChild(splash);
    };

    var createCss = function () {
        var css = `
body {
   
}

#application-splash-wrapper {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #89CAD0;

    
}


#application-splash {
    position: relative;
    height:100%;

    background-size: cover;
    background-repeat: no-repeat;
    background-color: #89CAD0;
}

/*centers the logo*/
#application-splash img {
    position: absolute;
    top: 20%;
    left: 50%;
    width: 40vw; /* vw stands for viewport width. 1vw = 1% of viewport width */
    height: auto; /* Keeps aspect ratio */
    transform: translate(-50%, -50%);
}

#progress-bar-container {
    position: fixed;
    top: 42%;
    left: 50%;
    margin: 20px 0 0 -20%;  /* Half of the width, which is 40% */
    height: 30px;
    width: 40%;
    background-color: #4B381B;
    border-radius: 25px;
}

#progress-bar {
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: #EDBD00;
    border-radius: 25px;
}

@media (max-width: 400px) {
    #application-splash {
        width: 400px;
    }
}

#loading-text {
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 22px;
  font-family: Futura;
  text-align: center;
  white-space: nowrap;
  text-shadow: -2px 0 #654321, 0 2px #654321, 2px 0 #654321, 0 -2px #654321;
  max-width: 100%;
}

@media (max-width: 768px) {
  #loading-text {
    font-size: 15px; /* Adjust the font size for smaller screens */
  }
}

@media (max-width: 500px) {
  #loading-text {
    font-size: 10px; /* Adjust the font size for smaller screens */
  }
}

@media (max-width: 300px) {
  #loading-text {
    display:none;
  }
}
`;


        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        document.head.appendChild(style);
    };

    createCss();

    /**
     * Sets the status of the progress bar with ID 'progress-bar'
     * @param {*} value The progress out of 100 to set the bar to
     */
    function setProgressBar(progBarName, value) {
        const bar = document.getElementById(progBarName);
        if (bar) {
            value = Math.min(1, Math.max(0, value));
            bar.style.width = value * 100 + '%';
        }
    }

    /**
     * Checks if the specified hostName matches the current site this is running on
     * @param hostName The hostname to check
     * @returns Whether it's on the specified host site
     */
    function isOnSpecificHostname(hostName) {
        //Get the current hostname
        const currentHostname = getHostName();
        return currentHostname.includes(hostName);

    }

    /**
     * Returns the hostname of the current site the game is on
     * @returns The current hostname
     */
    function getHostName() {
        return (window.location != window.parent.location)
        ? document.referrer
        : document.location.href;
    }

    //check if current site is FB - and if so, add FB Instant Game script
    const FBSiteName = "facebook"
    const isOnFacebook = isOnSpecificHostname(FBSiteName);
    var FBInstantGameLoaded = false;
    if(isOnFacebook) {
        const FBInstantGameScript = document.createElement(`script`);
        FBInstantGameScript.src = `https://connect.facebook.net/en_US/fbinstant.7.1.js`;
        document.head.appendChild(FBInstantGameScript);
        FBInstantGameScript.onload = () => {
            console.debug("[LoadingPage: FBinstant] script has loaded:");
            checkFBInstantGameSDKReady();
        };
    }

    /**
     * Initialiazes the FBInstant SDK
     */
    function checkFBInstantGameSDKReady() {
        if(!isOnFacebook) return;
        FBInstant.initializeAsync().then(() => {
            FBInstantGameLoaded = true;
            console.debug(`[LoadingPage: FBinstant] initializeAsync!`);
        });
    }

    let maxRetries = 5;
    let retryCount = 0;
    let retryInterval = 5000; // 2 seconds
    function tryStartFBInstantgame() {
        console.debug(`[LoadingPage: fbinstant] Calling startGameAsync`);
        if (FBInstantGameLoaded) {
            FBInstant.startGameAsync()
                .then(() => {
                    console.debug(`[LoadingPage: fbinstant] Game has loaded!`);
                })
                .catch((error) => {
                    console.error(`[LoadingPage: fbinstant] Error starting game: ${error.message}`);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        console.debug(`[LoadingPage: fbinstant] Retrying... (${retryCount}/${maxRetries})`);
                        setTimeout(tryStartGame, retryInterval);
                    } else {
                        console.error(`[LoadingPage: fbinstant] Failed to start game after ${maxRetries} attempts.`);
                    }
                });
        }
    }

    /**
     * We will combine a fake progress bar with a real progress bar
     * to make it feel like the game is loading evenly.
     * Currently, the game spends 90% of the time to load 10%, and
     * 10% of the time to load 90%. This will give it the illusion of it
     * being a lot smoother.
     */
    let fakeProgressValue = 0; // Stores the current progress of the "fake" loading bar
    let fakeIncrement = 0.007; // The initial speed to increase fake loading bar by
    const DECELERATION_RATE = 0.99; // The de-acceleration factor for the loading bar speed
    const FAKE_INTERVAL = 16; // Update every 16ms for ~60fps
    const FAKE_MAX = 0.85; // The % the fake progress bar can load up to
    const FAKE_MIN_INCREMENT = 0.0001; // The minimum increment the loading bar can be

    const fakeInterval = setInterval(() => {
        fakeProgressValue += fakeIncrement;
        fakeIncrement = Math.max(fakeIncrement * DECELERATION_RATE, FAKE_MIN_INCREMENT); // Ensure increment doesn't get too small

        if (fakeProgressValue >= FAKE_MAX) {
            fakeProgressValue = FAKE_MAX;   // Ensure it doesn't exceed FAKE_MAX
            clearInterval(fakeInterval);    // Stop the fake progress once it reaches the cap
        }
        //show regular loading bar if not on fb, otherwise use fb's loading bar
        FBInstantGameLoaded ? FBInstant.setLoadingProgress(fakeProgressValue * 100) : setProgressBar('progress-bar', fakeProgressValue);
    }, FAKE_INTERVAL);

    app.on('preload:end', function () {
        app.off('preload:progress');
    });
    // Real progress listener
    app.on('preload:progress', (realProgressValue) => {
        //the real progress bar will take over the fake progress var, once its % value is higher
        if (realProgressValue > fakeProgressValue) {
            clearInterval(fakeInterval); // Stop the fake progress
        }
        //show regular loading bar if not on fb, otherwise use fb's loading bar
        FBInstantGameLoaded ? FBInstant.setLoadingProgress(realProgressValue * 100) : setProgressBar('progress-bar', realProgressValue);
    });
    app.on('start', function() {
        clearInterval(fakeInterval);  // Clear any running fake intervals
        hideSplash();
        if(FBInstantGameLoaded) {
            //Facebook wont load the game until startGameAsync is called!
            tryStartFBInstantgame();
        }
    });
});