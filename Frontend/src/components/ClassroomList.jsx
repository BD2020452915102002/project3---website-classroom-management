import React, {useState} from 'react';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemText from "@mui/material/ListItemText";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {Collapse} from "@mui/material";
import List from "@mui/material/List";
import SchoolIcon from "@mui/icons-material/School";

function ClassroomList() {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(!open);
    };
    return (
       <div>
           <ListItemButton onClick={handleClick}>
               <ListItemIcon>
                   <SchoolIcon />
               </ListItemIcon>
               <ListItemText primary="Danh sách lớp học" />
               {open ? <ExpandLess /> : <ExpandMore />}
           </ListItemButton>
           <Collapse in={open} timeout="auto" unmountOnExit>
               <List component="div" disablePadding>
                   <ListItemButton sx={{ pl: 4 }}>
                       <ListItemIcon>
                           <StarBorder />
                       </ListItemIcon>
                       <ListItemText primary="Starred" />
                   </ListItemButton>
               </List>
           </Collapse>
       </div>
    );
}

export default ClassroomList;