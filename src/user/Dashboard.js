// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // import { API } from '../backend'
// import { BACKEND_BASE_URL } from "../constant";

// import { isAuthenticated } from "../auth";

import Menu from "../core/Menu";
import Footer from "../core/Footer";
import ShortenUrlUser from "./ShortenUrlUser";

// const Dashboard = () => {
//   const [links, setLinks] = useState([]);

//   const { _id, username } = isAuthenticated().user;
//   const { token } = isAuthenticated();

//   useEffect(() => {
//     axios
//       .get(`${BACKEND_BASE_URL}/urls/${_id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((res) => {
//           console.log(res.data);
//         setLinks(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <>
//       <Menu />

//       <div className="dashboard container">
//         <div
//           className="dashboard-head text-dark text-center m-auto pt-4 display-4"
//           style={{ textTransform: "capitalize" }}
//         >
//           Hey {username}
//         </div>
//         <div className="sub-dashboard-head text-muted text-center m-auto pt-3 pb-5">
//           {" "}
//           Manage all your shorten links here & keep a track on them
//         </div>
//       </div>

//       <div className="row text-dark m-auto more">
//         <div className="short-links container card text-dark m-auto">
//           <div className="card-body">
//             <ul className="list-group list-group-flush">
//               {links.map((link) => (
//                 <li className="list-group-item row d-flex p-3 mt-1">
//                   <span className="col-lg-7">{link?.originalUrl}</span>
//                   <a
//                     className="col-lg-4 list-group-links"
//                     href={`${link?.shortUrl}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     {link.shortUrl}
//                   </a>
//                   <span className="col-lg-1">
//                     <button className="copy btn btn-light text-primary mb-2">
//                       Copy
//                     </button>
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         {/* //Create a button and design it
//                     <div>
//                         <Button>GENERATE</Button>
//                     </div> */}
//       </div>
//       <ShortenUrlUser />
//       <Footer />
//     </>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const response = await axios.get("/api/links");
    setLinks(response.data);
  };

  const handleLinkManagementClick = () => {
    setShowLinks(true);
  };

  const handleCreateLinkClick = () => {
    // TODO: implement create link functionality
  };

  return (
    <div className="container-fluid">
      <Menu />
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="#"
                    onClick={handleLinkManagementClick}
                  >
                    Link Management
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="#"
                    onClick={handleCreateLinkClick}
                  >
                    Create Link
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Middle bar */}
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            {showLinks && (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>URL</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map((link) => (
                      <tr key={link.id}>
                        <td>{link.id}</td>
                        <td>{link.url}</td>
                        <td>{link.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
