import React from 'react';
import Banner from '../../components/Home/Banner';
import SixStudySession from '../../components/Home/SixStudySession';
import TopCollaborations from '../../components/Home/TopCollaborations';
import UpcomingLiveCollaborations from '../../components/Home/UpcomingLiveCollaborations';
import ResourcesLearningPaths from '../../components/Home/ResourcesLearningPaths';
import SuccessStories from '../../components/Home/SuccessStories';
import LearningAchievements from '../../components/Home/LearningAchievements';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <SixStudySession></SixStudySession>
            <TopCollaborations></TopCollaborations>
            <ResourcesLearningPaths></ResourcesLearningPaths>
            <UpcomingLiveCollaborations></UpcomingLiveCollaborations>
            <SuccessStories></SuccessStories>
            <LearningAchievements></LearningAchievements>
        </div>
    );
};

export default Home;