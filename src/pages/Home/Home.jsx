import React from 'react';
import Banner from '../../components/Home/Banner';
import SixStudySession from '../../components/Home/SixStudySession';
import TopCollaborations from '../../components/Home/TopCollaborations';
import UpcomingLiveCollaborations from '../../components/Home/UpcomingLiveCollaborations';
import ResourcesLearningPaths from '../../components/Home/ResourcesLearningPaths';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SixStudySession></SixStudySession>
            <TopCollaborations></TopCollaborations>
            <ResourcesLearningPaths></ResourcesLearningPaths>
            <UpcomingLiveCollaborations></UpcomingLiveCollaborations>
        </div>
    );
};

export default Home;