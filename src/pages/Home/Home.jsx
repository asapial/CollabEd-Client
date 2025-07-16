import React from 'react';
import Banner from '../../components/Home/Banner';
import SixStudySession from '../../components/Home/SixStudySession';
import TopCollaborations from '../../components/Home/TopCollaborations';
import UpcomingLiveCollaborations from '../../components/Home/UpcomingLiveCollaborations';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SixStudySession></SixStudySession>
            <TopCollaborations></TopCollaborations>
            <UpcomingLiveCollaborations></UpcomingLiveCollaborations>
        </div>
    );
};

export default Home;