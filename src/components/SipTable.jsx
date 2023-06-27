import React, { useEffect, useState } from "react";
import AddSip from "./AddSip";
import EditSip from "./EditSip";

const API = "http://localhost:8000/ext";

function SipTable() {
  const [sips, setSips] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [editPopUp, setEditPopUp] = useState(false);
  const [selectedSipId, setSelectedSipId] = useState(null);

  const togglePopup = () => {
    setPopUp((prevPopup) => !prevPopup);
  };

  const toggleEditPopup = (sipId) => {
    setSelectedSipId(sipId);
    setEditPopUp((prevPopup) => !prevPopup);
  };

  const closePopup = () => {
    fetchSips(API);
    setPopUp(false);
    setEditPopUp(false);
  };

  useEffect(() => {
    fetchSips(API);
  }, []);

  const fetchSips = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSips(data);
    } catch (error) {
      console.error("Error fetching sip peers:", error);
    }
  };

  const deleteSip = async (sipId) => {
    try {
      await fetch(`${API}/${sipId}`, {
        method: "DELETE",
      });
      setSips((prevSips) => prevSips.filter((sip) => sip.SIP_ID !== sipId));
    } catch (error) {
      console.error("Error deleting extension:", error);
    }
  };

  return (
    <>
      <div className="relative w-auto m-1 overflow-x-auto rounded-lg shadow-md">
        <table className="w-full h-auto text-sm text-left text-gray-900 shadow-lg">
          <thead className="text-xs text-white bg-gray-800">
            <tr>
              <th scope="col" className="px-2 py-3">
                NAME
              </th>
              <th scope="col" className="px-2 py-3">
                DISALLOW
              </th>
              <th scope="col" className="px-2 py-3">
                HOST
              </th>
              <th scope="col" className="px-2 py-3">
                ALLOW
              </th>
              <th scope="col" className="px-2 py-3">
                TYPE
              </th>
              <th scope="col" className="px-2 py-3">
                SECRET
              </th>
              <th scope="col" className="px-2 py-3">
                DTMF MODE
              </th>
              <th scope="col" className="px-2 py-3">
                QUALIFY
              </th>
              <th scope="col" className="px-2 py-3">
                CAN RE-INVITE
              </th>
              <th scope="col" className="px-2 py-3">
                INSECURE
              </th>
              <th scope="col" className="px-2 py-3">
                NAT
              </th>
              <th scope="col" className="px-2 py-3">
                DIRECT MEDIA
              </th>
              <th scope="col" className="px-2 py-3">
                DIRECT RTP SETUP
              </th>
              <th scope="col" className="px-2 py-3">
                CONTEXT
              </th>
              <th scope="col" className="px-2 py-3">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg w-20 text-xs px-2 py-2.5"
                  onClick={togglePopup}
                >
                  Add New
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sips.map((sip) => {
              const {
                SIP_ID,
                DISALLOW,
                HOST,
                ALLOW,
                TYPE,
                SECRET,
                DTMFMODE,
                QUALIFY,
                CANREINVITE,
                INSECURE,
                NAT,
                DIRECTMEDIA,
                DIRECTRTPSETUP,
                CONTEXT,
              } = sip;
              return (
                <tr
                  key={SIP_ID}
                  className="bg-white border-black hover:bg-gray-100"
                >
                  <td className="px-2 py-4 font-medium text-gray-900">
                    {SIP_ID}
                  </td>
                  <td className="px-2 py-4">{DISALLOW}</td>
                  <td className="px-2 py-4">{HOST}</td>
                  <td className="px-2 py-4">{ALLOW}</td>
                  <td className="px-2 py-4">{TYPE}</td>
                  <td className="px-2 py-4">{SECRET}</td>
                  <td className="px-2 py-4">{DTMFMODE}</td>
                  <td className="px-2 py-4">{QUALIFY}</td>
                  <td className="px-2 py-4">{CANREINVITE}</td>
                  <td className="px-2 py-4">{INSECURE}</td>
                  <td className="px-2 py-4">{NAT}</td>
                  <td className="px-2 py-4">{DIRECTMEDIA}</td>
                  <td className="px-2 py-4">{DIRECTRTPSETUP}</td>
                  <td className="px-2 py-4">{CONTEXT}</td>
                  <td className="flex px-2 py-4">
                    <button
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 w-14 font-medium rounded-lg text-xs px-2 py-2.5 mr-2"
                      onClick={() => toggleEditPopup(SIP_ID)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-medium w-14 rounded-lg text-xs px-2 py-2.5 mr-2"
                      onClick={() => deleteSip(SIP_ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {popUp && <AddSip closePopup={closePopup} />}
      {editPopUp && <EditSip closePopup={closePopup} sipId={selectedSipId} />}
    </>
  );
}

export default SipTable;
