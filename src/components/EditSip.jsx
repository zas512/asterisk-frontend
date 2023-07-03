import React, { useState, useRef, useEffect } from "react";
import useOutsideListener from "./OutsideListner";
import Lottie from "lottie-react";
import confirmed from "../anims/confirm.json";
import denied from "../anims/denied.json";
import PropTypes from "prop-types";

EditSip.propTypes = {
  closePopup: PropTypes.func,
  sipId: PropTypes.number,
};

function EditSip({ closePopup, sipId }) {
  const [disallow, setDisallow] = useState("");
  const [host, setHost] = useState("");
  const [allow, setAllow] = useState("");
  const [type, setType] = useState("");
  const [secret, setSecret] = useState("");
  const [dtmfMode, setDtmfMode] = useState("");
  const [qualify, setQualify] = useState("");
  const [canReInvite, setCanReinvite] = useState("");
  const [insecure, setInsecure] = useState("");
  const [nat, setNat] = useState("");
  const [directMedia, setDirectMedia] = useState("");
  const [directRtpSetup, setDirectRtpSetup] = useState("");
  const [context, setContext] = useState("");
  const [anim, setAnim] = useState(false);
  const [animType, setAnimType] = useState(true);

  const outsideRef = useRef(null);

  const input_des =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";
  const label_des = "block text-sm font-medium text-gray-900";

  useOutsideListener(outsideRef, () => {
    closePopup();
  });

  useEffect(() => {
    if (sipId) {
      const fetchSipData = async () => {
        try {
          const res = await fetch(`http://localhost:8000/ext/${sipId}`);
          if (res.ok) {
            const sipData = await res.json();
            setDisallow(sipData.DISALLOW);
            setHost(sipData.HOST);
            setAllow(sipData.ALLOW);
            setType(sipData.TYPE);
            setSecret(sipData.SECRET);
            setDtmfMode(sipData.DTMFMODE);
            setQualify(sipData.QUALIFY);
            setCanReinvite(sipData.CANREINVITE);
            setInsecure(sipData.INSECURE);
            setNat(sipData.NAT);
            setDirectMedia(sipData.DIRECTMEDIA);
            setDirectRtpSetup(sipData.DIRECTRTPSETUP);
            setContext(sipData.CONTEXT);
          } else {
            console.error("Failed to fetch SIP data");
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchSipData();
    }
  }, [sipId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSip = {
      SIP_ID: sipId,
      DISALLOW: disallow,
      HOST: host,
      ALLOW: allow,
      TYPE: type,
      SECRET: secret,
      DTMFMODE: dtmfMode,
      QUALIFY: qualify,
      CANREINVITE: canreinvite,
      INSECURE: insecure,
      NAT: nat,
      DIRECTMEDIA: directMedia,
      DIRECTRTPSETUP: directRtpSetup,
      CONTEXT: context,
    };

    try {
      const res = await fetch(`http://localhost:8000/ext/${sipId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSip),
      });

      if (res.ok) {
        resetForm();
      } else {
        setAnimType(false);
        console.error("Failed to update SIP");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setSipId("");
    setDisallow("");
    setHost("");
    setAllow("");
    setType("");
    setSecret("");
    setDtmfMode("");
    setQualify("");
    setCanReinvite("");
    setInsecure("");
    setNat("");
    setDirectMedia("");
    setDirectRtpSetup("");
    setContext("");
    setAnim(true);
    setTimeout(() => {
      closePopup();
    }, 1500);
  };

  return (
    <div className="absolute top-0">
      <form
        className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 shadow-lg bg-opacity-80"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={outsideRef}
          className="flex flex-col items-center w-auto h-auto p-4 rounded-lg bg-gray-50"
        >
          <h1 className="m-1 text-xl text-gray-900">Edit SIP</h1>
          <section className="flex my-1">
            <div className="m-1">
              <label htmlFor="name" className={label_des}>
                SIP ID
              </label>
              <input
                type="text"
                id="name"
                value={sipId}
                autoComplete="off"
                disabled
                onChange={(e) => setSipId(e.target.value)}
                className={input_des}
                required
              />
            </div>
            <div className="m-1">
              <label htmlFor="disallow" className={label_des}>
                Disallow
              </label>
              <input
                type="text"
                id="disallow"
                value={disallow}
                autoComplete="off"
                onChange={(e) => setDisallow(e.target.value)}
                className={input_des}
                required
              />
            </div>
            <div className="m-1">
              <label htmlFor="host" className={label_des}>
                Host
              </label>
              <input
                type="text"
                id="host"
                value={host}
                autoComplete="off"
                onChange={(e) => setHost(e.target.value)}
                className={input_des}
                required
              />
            </div>
          </section>
          <section className="flex my-1">
            <div className="m-1">
              <label htmlFor="allow" className={label_des}>
                Allow
              </label>
              <input
                type="text"
                id="allow"
                value={allow}
                autoComplete="off"
                onChange={(e) => setAllow(e.target.value)}
                className={input_des}
                required
              />
            </div>
            <div className="m-1">
              <label htmlFor="type" className={label_des}>
                Type
              </label>
              <input
                type="text"
                id="type"
                value={type}
                autoComplete="off"
                onChange={(e) => setType(e.target.value)}
                className={input_des}
                required
              />
            </div>
            <div className="m-1">
              <label htmlFor="secret" className={label_des}>
                Secret
              </label>
              <input
                type="text"
                id="secret"
                value={secret}
                autoComplete="off"
                onChange={(e) => setSecret(e.target.value)}
                className={input_des}
                required
              />
            </div>
          </section>
          <section className="flex my-1">
            <div className="m-1">
              <label htmlFor="dtmfMode" className={label_des}>
                DTMF Mode
              </label>
              <input
                type="text"
                id="dtmfMode"
                value={dtmfMode}
                autoComplete="off"
                onChange={(e) => setDtmfMode(e.target.value)}
                className={input_des}
                required
              />
            </div>
            <div className="m-1">
              <label htmlFor="qualify" className={label_des}>
                Qualify
              </label>
              <input
                type="text"
                id="qualify"
                value={qualify}
                autoComplete="off"
                onChange={(e) => setQualify(e.target.value)}
                className={input_des}
                required
              />
            </div>
            <div className="m-1">
              <label htmlFor="canreinvite" className={label_des}>
                Can Re-Invite
              </label>
              <input
                type="text"
                id="canreinvite"
                value={canReInvite}
                autoComplete="off"
                onChange={(e) => setCanReInvite(e.target.value)}
                className={input_des}
                required
              />
            </div>
          </section>
          <section className="flex my-1">
            <div className="m-1">
              <label htmlFor="insecure" className={label_des}>
                Insecure
              </label>
              <input
                type="text"
                id="insecure"
                value={insecure}
                autoComplete="off"
                onChange={(e) => setInsecure(e.target.value)}
                className={input_des}
                required
              />
            </div>
            <div className="m-1">
              <label htmlFor="nat" className={label_des}>
                NAT
              </label>
              <input
                type="text"
                id="nat"
                value={nat}
                autoComplete="off"
                onChange={(e) => setNat(e.target.value)}
                className={input_des}
                required
              />
            </div>
            <div className="m-1">
              <label htmlFor="directMedia" className={label_des}>
                Direct Media
              </label>
              <input
                type="text"
                id="directMedia"
                value={directMedia}
                autoComplete="off"
                onChange={(e) => setDirectMedia(e.target.value)}
                className={input_des}
                required
              />
            </div>
          </section>
          <section className="flex my-1">
            <div className="m-1">
              <label htmlFor="directRtpSetup" className={label_des}>
                Direct RTP Setup
              </label>
              <input
                type="text"
                id="directRtpSetup"
                value={directRtpSetup}
                autoComplete="off"
                onChange={(e) => setDirectRtpSetup(e.target.value)}
                className={input_des}
                required
              />
            </div>
            <div className="m-1">
              <label htmlFor="context" className={label_des}>
                Context
              </label>
              <input
                type="text"
                id="context"
                value={context}
                autoComplete="off"
                onChange={(e) => setContext(e.target.value)}
                className={input_des}
                required
              />
            </div>
          </section>
          <div className="flex justify-center w-full mt-2 space-x-4">
            <button
              type="submit"
              className="w-24 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closePopup}
              className="w-24 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      {anim && (
        <div className="fixed transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <Lottie
            animationData={animType ? confirmed : denied}
            loop={false}
            style={{ width: "200px", height: "200px" }}
          />
        </div>
      )}
    </div>
  );
}

export default EditSip;
