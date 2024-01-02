import { ReactComponent as AppLogo } from "./appLogo.svg";
import { ReactComponent as VideoIcon } from "./Videos.svg";
import { ReactComponent as UploadIcon } from "./Upload-Icon.svg";
import { ReactComponent as UploadPicIcon } from "./UploadPicture.svg";
import {ReactComponent as DragIcon } from './Drag.svg'
import {ReactComponent as LogOutIcon } from './Logout.svg'
import {ReactComponent as DeleteIcon } from './Delete.svg'
import {ReactComponent as SoundIcon } from './Sound.svg'
import {ReactComponent as MuteSoundIcon } from './MuteSound.svg'
import {ReactComponent as PageNotFound } from './Page404.svg'

const SvgIcons = {
  appLogo: <AppLogo />,
  dragIcon: <DragIcon/>,
  deleteIcon:<DeleteIcon/>,
  soundIcon:<SoundIcon/>,
  muteIcon:<MuteSoundIcon/>,
  logOutIcon:<LogOutIcon/>,
  uploadIcon: <UploadIcon />,
  uploadPicIcon: <UploadPicIcon/>,
  videoIcon: <VideoIcon />,
  pageNotFound: <PageNotFound />,
  
};

export default SvgIcons;
