import React, { useContext } from 'react';
import "./Home.css"
import { BizBanterContext } from '../../context/context';
import SideMenu from '../../components/SideMenu/SideMenu';
import Logo from '../../components/Logo/Logo';
import MainDrawer from '../../components/SideMenu/MainDrawer';
import Pdf from '../../components/Body/Pdf';
import Word from '../../components/Body/Word';
import { ConstructionOutlined } from '@mui/icons-material';
import Powerpoint from '../../components/Body/Powerpoint';
import Text from '../../components/Body/Text';
import WebUrl from '../../components/Body/WebUrl';
import YTube from '../../components/Body/Ytube';
import SnackBar from '../../components/SnackBar/SnackBar';

function Home(props) {
    const { selectedModule, screenWidth } = useContext(BizBanterContext);
    const mainWidthBreak = 760;
    return (
        <div className='home_container'>
            <div className='home_container_left'>
                <div className='home_left_header'>
                    <Logo />
                </div>
                <SideMenu />
            </div>
            <div className='home_container_right'>
                <div className='home_right_header'>
                    {screenWidth <= mainWidthBreak ? <MainDrawer /> : <></>}
                    <h3>{selectedModule.title}</h3>
                </div>
                <Body />
                <SnackBar />
            </div>
        </div>
    );
}

const Body = () => {
    const { selectedModule } = useContext(BizBanterContext);
    if (selectedModule.key === 'pdf') {
        return <Pdf />
    } else if (selectedModule.key === "docx") {
        return <Word />
    } else if (selectedModule.key === "pptx") {
        return <Powerpoint />
    } else if (selectedModule.key === "txt") {
        return <Text />
    } else if (selectedModule.key === "web") {
        return <WebUrl />
    } else if (selectedModule.key === 'yt') {
        return <YTube />
    }
}

export default Home;