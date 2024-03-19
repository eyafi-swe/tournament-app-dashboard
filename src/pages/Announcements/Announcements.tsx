import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../consts/const";
import DefaultLayout from "../../layout/DefaultLayout";

const Announcements = () => {
    const [textareaContent, setTextareaContent] = useState("");
    const [announcements, setAnnouncements] = useState({ _id: "", announcement: "" });
    const [notifications, setNotifications] = useState("");
    const [loading, setLoading] = useState(false);
    const [notificationsList, setNotificationsList] = useState([]);
    const [refetch, setRefetch] = useState(false);

    const handleTextareaChange = (event: any) => {
        setTextareaContent(event.target.value);
    };

    const handleUpdateClick = (id: string) => {

        console.log(id, textareaContent);
        if (id === "") {
            fetch(`${BASE_URL}/announcement`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ announcement: textareaContent }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        toast.success("Announcement added successfully");
                    } else {
                        toast.error("Something went wrong! Try again.");
                    }
                })
                .catch((error) => console.error("Error adding announcements:", error));
        }
        else {

            fetch(`${BASE_URL}/announcement/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ announcement: textareaContent }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message) {
                        toast.success("Announcement updated successfully");
                    }
                })
                .catch((error) => console.error("Error updating announcements:", error));
        }
    };

    useEffect(() => {
        fetch(`${BASE_URL}/announcement`)
            .then((res) => res.json())
            .then((announcements) => {
                console.log(announcements);
                setAnnouncements(announcements[0]);
            })
            .catch((error) => console.error("Error fetching announcements:", error));
    }, []);

    const handleNotificationSend = () => {
        const payload = {
            text: notifications,
        };

        fetch(`${BASE_URL}/announcement/news`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }).then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Notification sent successfully");
                    setRefetch(!refetch);
                }
                else {
                    toast.error("Something went wrong");
                }
            })
            .catch((error) => console.error("Error sending notifications:", error));
    }

    useEffect(() => {
        setLoading(true);
        fetch(`${BASE_URL}/announcement/news`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setNotificationsList(data);
            })
            .catch((error) => console.error("Error fetching notifications:", error))
            .finally(() => setLoading(false));
    }, [refetch]);

    const handleDeleteNews = (id: string) => {
        setLoading(true);
        fetch(`${BASE_URL}/announcement/news/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success("Notification deleted successfully");
                    setRefetch(!refetch);
                }
                else {
                    toast.error("Something went wrong");
                }
            })
            .catch((error) => console.error("Error deleting notifications:", error))
            .finally(() => setLoading(false));
    }

    return (
        <DefaultLayout>

            <div className=" min-h-screen p-10">
                <h1 className="text-2xl font-semibold uppercase mb-4 text-center">
                    Update Announcement
                </h1>
                <textarea
                    className="border border-gray-400 focus:outline-none bg-slate-300 rounded p-2 w-full h-32 resize-none"
                    defaultValue={announcements?.announcement}
                    onChange={handleTextareaChange}
                ></textarea>
                <button
                    className="mt-4 px-10 py-2 duration-300 text-white font-semibold rounded bg-success hover:bg-green-600"
                    disabled={textareaContent === ""}
                    onClick={() => handleUpdateClick(announcements?._id)}
                >
                    Update
                </button>
                <hr className="mt-5" />
                <h1 className="text-2xl mt-3 font-semibold uppercase mb-4 text-center">
                    Notifications / News
                </h1>
                <textarea
                    className="border border-gray-400 focus:outline-none bg-slate-300  rounded p-2 w-full h-32 resize-none"
                    value={notifications}
                    onChange={(e) => setNotifications(e.target.value)}
                ></textarea>
                <button
                    className="mt-4 px-10 py-2 duration-300 text-white rounded font-semibold rounded bg-success hover:bg-green-600"
                    onClick={() => {
                        handleNotificationSend();
                    }}
                >
                    Send
                </button>

                <hr className="mt-5" />
                <h1 className="text-2xl mt-3 font-semibold uppercase mb-4 text-center">
                    Sent News / Notifications
                </h1>

                {
                    loading && <h1 className="text-2xl mt-3 font-semibold uppercase mb-4 text-center">Loading...</h1>
                }
                {
                    notificationsList.length > 0 && notificationsList.map(({ _id, text }) => (
                        <div key={_id} className="border border-gray-400 rounded p-2 my-2 flex justify-between gap-3 items-center">
                            <p className="text-black">{text}</p>
                            <button className="btn btn-sm btn-warning"
                                onClick={() => handleDeleteNews(_id)}
                            >Delete</button>
                        </div>

                    ))
                }

            </div>
        </DefaultLayout>
    );
};

export default Announcements;
