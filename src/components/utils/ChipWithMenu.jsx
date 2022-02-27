import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
/* import { useAuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom"; */

export default function ChipWithMenu(/* { isGame } */) {
  /*   const { signout, user } = useAuthContext();
  const navigate = useNavigate(); */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (e) => {
    try {
      setAnchorEl(null);

      /*  if (e.currentTarget.id === "logout") {
        await signout();
        navigate("/");
      }
      if (e.currentTarget.id === "profile") navigate("/profile");

      if (e.currentTarget.id === "profile-settings")
        navigate("/profile-settings"); */
    } catch (e) {}
  };

  return (
    <div>
      <Chip
        icon={<AccountCircleIcon />}
        label={"test@test.cz"}
        variant="outlined"
        color="primary"
        onClick={handleClick}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ color: "white", marginRight: "0.5em" }}
      />
      {/* <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {/*  {!isGame && (
          <MenuItem onClick={handleClose} id="profile">
            Profile
          </MenuItem>
        )}
        {!isGame && (
          <MenuItem onClick={handleClose} id="profile-settings">
            Account Settings
          </MenuItem>
        )}
 */}
        <MenuItem onClick={handleClose} id="logout">
          {/* isGame ? "End game and logout" : */ "Logout"}
        </MenuItem>
      </Menu>
    </div>
  );
}
//
