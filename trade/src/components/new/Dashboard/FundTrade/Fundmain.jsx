import React, { useState, useEffect } from 'react';
import Fundtrade from './Fundtrade';
import FundDash from './FundDash';
// Assuming axios is used for API calls
import axios from 'axios';

const Fundmain = () => {
    const [isSubscribed, setIsSubscribed] = useState(true);

    // useEffect(() => {
    //     // Example function to check subscription status
    //     const checkSubscriptionStatus = async () => {
    //         try {
    //             const response = await axios.get('/api/check-subscription');
    //             setIsSubscribed(response.data.isSubscribed);
    //         } catch (error) {
    //             console.error('Error checking subscription status', error);
    //         }
    //     };

    //     checkSubscriptionStatus();
    // }, []);

    return (
        <div>
            {isSubscribed ? <FundDash /> : <Fundtrade />}
        </div>
    );
}

export default Fundmain;
