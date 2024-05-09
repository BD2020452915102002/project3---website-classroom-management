import List from "@mui/material/List";
import NewspaperIcon from "@mui/icons-material/Newspaper.js";
import EqualizerIcon from "@mui/icons-material/Equalizer.js";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration.js";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth.js";
import SchoolIcon from "@mui/icons-material/School.js";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ClassroomList from "../components/ClassroomList.jsx";
import {Link} from "react-router-dom";

function Nav() {
    return (
        <div>
            <List>
                {
                    [
                        {title: 'Tin tức chung', icon: <NewspaperIcon/>, path:'/student/news'},
                        {title: 'Thống kê học tập', icon: <EqualizerIcon/>,path:'/student/statistic'},
                        {title: 'Đăng ký lớp học', icon: <AppRegistrationIcon/>,path:'/student/news'},
                        {title: 'Thời khoá biểu', icon: <CalendarMonthIcon/>,path:'/student/statistic'},
                        {title: 'Kết nối phòng đào tạo', icon: <SchoolIcon/>,path:'/student/news'},
                    ].map((e, i) => (
                        <Link to={e.path} key={i}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {e.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={e.title}/>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    ))}
            </List>
            <ClassroomList/>
        </div>
    );
}

export default Nav;