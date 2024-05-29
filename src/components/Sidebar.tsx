import Sidenavbar from "./Sidenavbar";
import Searchbar from "./Searchbar";
import Chats from "./Chats";

function Sidebar() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Sidenavbar />
      <Searchbar />
      <Chats />
    </div>
  );
}

export default Sidebar;
