import React, { useEffect } from 'react';

const ShowAdButton = () => {
    useEffect(() => {
       if (typeof window.show_8453362 === 'function') {
       window.show_8453362();
   } else {
       console.error('window.show_8453362 is not a function');
   }

        const tag = document.createElement('script');
        tag.src = '//niphaumeenses.net/vignette.min.js';
        tag.dataset.zone = '8453362';
        tag.dataset.sdk = 'show_8453362';

        document.body.appendChild(tag);
    }, []);

    const showAd = async () => {
        try {
            await window.show_8453362();
            console.log('Ad displayed successfully.');
            // Add any additional logic to be executed after the ad is displayed
        } catch (error) {
            console.error('Error displaying the ad:', error);
        }
    };

    return <button onClick={showAd}>Show ad</button>;
};

export default ShowAdButton;