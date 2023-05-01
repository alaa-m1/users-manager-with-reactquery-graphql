import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { LinkInfo } from "shared/types";
import { StyledLink } from "shared";
import { Link, Outlet, useLocation } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const links: Array<LinkInfo> = [
  { label: "Welcome", path: "/" },
  { label: "Users dashboard", path: "/users-dashboard" },
  { label: "About us", path: "/about" },
];
const accountLinks: Array<LinkInfo> = [{ label: "Login", path: "/login" }];

function AppLayout() {
  const { pathname } = useLocation();
  const [anchorElNavMenu, setAnchorElNavMenu] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElAccount, setAnchorElAccount] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNavMenu(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNavMenu(null);
  };

  const handleOpenAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElAccount(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAnchorElAccount(null);
  };

  return (
    <>
      <AppBar position="relative">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                height: "32px",
                width: "32px",
                margin: "3px",
                display: { xs: "none", md: "flex" },
                mr: 1,
              }}
              alt="Phoenix software"
              src={window.location.origin + "/images/Phoenix.png"}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontSize: "1rem",
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Phoenix Software
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="navigate between website pages"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNavMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNavMenu)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  ul: {
                    padding: "0px",
                    margin: "0px",
                  },
                  li: {
                    padding: "0px",
                    margin: "0px",
                  },
                  a: {
                    display: "inline-block",
                    width: "100%",
                    height: "100%",
                    padding: "10px 20px",
                  },
                }}
              >
                {links.map((link, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <StyledLink
                      to={link.path}
                      isactive={pathname === link.path ? "active" : "inActive"}
                    >
                      {link.label}
                    </StyledLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              component="img"
              sx={{
                height: "32px",
                width: "32px",
                margin: "3px",
                display: { xs: "flex", md: "none" },
                mr: 1,
              }}
              alt="Phoenix software"
              src={window.location.origin + "/images/Phoenix.png"}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontSize: "1rem",
                fontWeight: 400,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Phoenix Software
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {links.map((link, index) =>
                index !== 0 ? (
                  <StyledLink
                    to={link.path}
                    isactive={pathname === link.path ? "active" : "inActive"}
                  >
                    {link.label}
                  </StyledLink>
                ) : (
                  <></>
                )
              )}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open account menu">
                <IconButton onClick={handleOpenAccountMenu} sx={{ p: 0 }}>
                  <ManageAccountsIcon
                    sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElAccount}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElAccount)}
                onClose={handleCloseAccountMenu}
              >
                {accountLinks.map((link, index) => (
                  <MenuItem key={index} onClick={handleCloseAccountMenu}>
                    <StyledLink
                      to={link.path}
                      isactive={pathname === link.path ? "active" : "inActive"}
                    >
                      {link.label}
                    </StyledLink>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <main style={{ margin: "10px" }}>
        <Outlet />
      </main>
    </>
  );
}
export { AppLayout };
