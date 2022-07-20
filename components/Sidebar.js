import React from "react";
import Link from "next/link";
import { useUserData } from "../context/UserDataContext";
import { BiHome, BiTrash, BiArchive } from "react-icons/bi";
function Sidebar() {
  const { filterState, filterDispatch } = useUserData();
  const { labels, sortByPriority, sortByDate } = filterState;
  return (
    <div className="p-4 w-fit">
      <ul className="flex flex-row text-3xl gap-5 flex-wrap md:flex-col ">
        <Link href="/">
          <li className="flex items-center gap-5 cursor-pointer">
            <BiHome />
            Home
          </li>
        </Link>
        <Link href="/trash">
          <li className="flex items-center gap-5 cursor-pointer">
            <BiTrash />
            Trash
          </li>
        </Link>
        <Link href="/archive">
          <li className="flex items-center gap-5 cursor-pointer">
            <BiArchive />
            Archive
          </li>
        </Link>
        <div>
          <div className=" flex gap-4 justify-center items-center">
            <h1 className=" text-2xl">Filter</h1>
            <button className=" text-white text-2xl bg-gray-800 rounded p-2" onClick={() => filterDispatch({ type: "CLEAR_FILTER" })}>
              Clear
            </button>
          </div>


          <div>
            <div className=" text-2xl">SortBy Priority</div>
            <div>
              <label className=" text-lg">High</label>
              <input
                value="High"
                onChange={(e) =>
                  filterDispatch({
                    type: "SORT_BY_PRIORITY",
                    payload: e.target.value,
                  })
                }
                checked={sortByPriority === "High"}
                type="radio"
              />
            </div>
            <div>
              <label className=" text-lg">Medium</label>
              <input
                value="Medium"
                onChange={(e) =>
                  filterDispatch({
                    type: "SORT_BY_PRIORITY",
                    payload: e.target.value,
                  })
                }
                checked={sortByPriority === "Medium"}
                type="radio"
              />
            </div>
            <div>
              <label className=" text-lg">Low</label>
              <input
                value="Low"
                onChange={(e) =>
                  filterDispatch({
                    type: "SORT_BY_PRIORITY",
                    payload: e.target.value,
                  })
                }
                checked={sortByPriority === "Low"}
                type="radio"
              />
            </div>
          </div>

          <div>
            <div className=" text-2xl">SortBy label</div>
            <div>
              <label className=" text-lg">Work</label>
              <input
                value="Work"
                onChange={(e) =>
                  filterDispatch({
                    type: "FILTER_BY_LABEL",
                    payload: e.target.value,
                  })
                }
                checked={labels.includes("Work")}
                type="checkbox"
              />
            </div>
            <div>
              <label className=" text-lg">Home</label>
              <input
                value="Home"
                onChange={(e) =>
                  filterDispatch({
                    type: "FILTER_BY_LABEL",
                    payload: e.target.value,
                  })
                }
                checked={labels.includes("Home")}
                type="checkbox"
              />
            </div>
            <div>
              <label className=" text-lg">Chores</label>
              <input
                value="Chores"
                onChange={(e) =>
                  filterDispatch({
                    type: "FILTER_BY_LABEL",
                    payload: e.target.value,
                  })
                }
                checked={labels.includes("Chores")}
                type="checkbox"
              />
            </div>
            <div>
              <label className=" text-lg">Exercise</label>
              <input
                value="Exercise"
                onChange={(e) =>
                  filterDispatch({
                    type: "FILTER_BY_LABEL",
                    payload: e.target.value,
                  })
                }
                checked={labels.includes("Exercise")}
                type="checkbox"
              />
            </div>
          </div>
          <div>
            <div className=" text-2xl"><h5>SortBy Date</h5></div>
            <div>
              <label className=" text-lg">oldest</label>
              <input
                value="Oldest"
                onChange={(e) =>
                  filterDispatch({
                    type: "SORT_BY_DATE",
                    payload: e.target.value,
                  })
                }
                checked={sortByDate === "Oldest"}
                type="radio"
              />
            </div>
            <div>
              <label className=" text-lg">newest</label>
              <input
                value="Newest"
                onChange={(e) =>
                  filterDispatch({
                    type: "SORT_BY_DATE",
                    payload: e.target.value,
                  })
                }
                checked={sortByDate === "Newest"}
                type="radio"
              />
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}
export { Sidebar };
