import { useState } from "react";
import { useEffect } from "react";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function EditIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182l-10.5 10.5a2.25 2.25 0 0 1-.933.59l-4.5 1.125a.75.75 0 0 1-.927-.927l1.125-4.5a2.25 2.25 0 0 1 .59-.933l10.5-10.5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 7.125 16.875 4.5"
        />
      </svg>
    </>
  );
}

function DeleteIcon() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.01-4.5H5.75m3.75 0V4.125c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125V4.5m-7.5 0h7.5"
        />
      </svg>
    </>
  );
}
function App() {
  useEffect(() => {
    fetch("http://localhost:5000/siswa")
      .then((res) => res.json())
      .then((data) => setSiswa(data));
  }, []);

  const [siswa, setSiswa] = useState([]);
  const [nama, setNama] = useState("");
  const [npm, setNpm] = useState("");
  const [EditisActive, setEditisActive] = useState(true);

  // function KirimSiswa() {
  //   if (!nama.trim()) {
  //     alert("Name is required");
  //     return;
  //   }
  //   if (!npm.trim()) {
  //     alert("Npm is required");
  //     return;
  //   }
  //   const dataSiswa = {
  //     nama: nama,
  //     npm: npm,
  //   };

  //   setSiswa(siswa.concat(dataSiswa));

  //   setNama("");
  //   setNpm("");
  //   setEditisActive(true);
  // }

  // jadi

  function KirimSiswa() {
    if (!nama.trim() || !npm.trim()) {
      alert("Lengkapi data!");
      return;
    }

    fetch("http://localhost:5000/siswa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama, npm }),
    })
      .then((res) => res.json())
      .then(() => {
        return fetch("http://localhost:5000/siswa");
      })
      .then((res) => res.json())
      .then((data) => setSiswa(data));

    setNama("");
    setNpm("");
    setEditisActive(true);
  }

  // function DeleteSiswa(DataNpm) {
  //   if (!confirm("Are you sure!")) return;

  //   const dataBaru = siswa.filter((item) => item.npm !== DataNpm);
  //   setSiswa(dataBaru);
  // }
  // jadi
  function DeleteSiswa(DataNpm) {
    if (!confirm("Are you sure!")) return;

    fetch(`http://localhost:5000/siswa/${DataNpm}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setSiswa((prev) => prev.filter((item) => item.npm !== DataNpm));
      });
  }

  function EditSiswa(DataNpm) {
    const dataBaru = siswa.find((item) => item.npm == DataNpm);

    setNama(dataBaru.nama);
    setNpm(dataBaru.npm);
    setEditisActive(false);
  }
  // function UpdateSiswa() {
  //   if (!nama.trim()) {
  //     alert("Name is required");
  //     return;
  //   }
  //   if (!npm.trim()) {
  //     alert("Npm is required");
  //     return;
  //   }
  //   const dataSiswa = {
  //     nama: nama,
  //     npm: npm,
  //   };

  //   const dataUpdate = siswa.map((item) =>
  //     item.npm === npm
  //       ? { nama: nama, npm: npm } // update data
  //       : item,
  //   );

  //   setSiswa(dataUpdate);

  //   setNama("");
  //   setNpm("");
  //   setEditisActive(true);
  // }
  // jadi

  function UpdateSiswa() {
    if (!nama.trim()) {
      alert("Name is required");
      return;
    }

    fetch(`http://localhost:5000/siswa/${npm}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nama }),
    })
      .then((res) => res.json())
      .then(() => {
        return fetch("http://localhost:5000/siswa");
      })
      .then((res) => res.json())
      .then((data) => setSiswa(data));

    setNama("");
    setNpm("");
    setEditisActive(true);
  }

  return (
    <>
      <div className="container-crud mt-[100px] m-auto">
        <h1>Data Siswa</h1>
        <div className="grid-crud grid grid-cols-2 mt-3">
          <div className="p-3">
            <label
              for="first_name"
              class="block mb-2.5 text-sm font-medium text-heading"
            >
              Name
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              id="first_name"
              class="rounded-[10px] bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="John"
            />
            <label
              for="npm"
              class="mt-3 block mb-2.5 text-sm font-medium text-heading"
            >
              Npm
            </label>
            <input
              type="text"
              value={npm}
              disabled={!EditisActive}
              onChange={(e) => setNpm(e.target.value)}
              id="npm"
              class="mt-3 rounded-[10px] bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="2341.."
            />
            <button
              type="button"
              onClick={KirimSiswa}
              class="rounded-[10px] mt-3 text-white bg-blue-500 box-border border border-transparent hover:bg-blue-300 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Kirim
            </button>
            {EditisActive ? (
              ""
            ) : (
              <button
                type="button"
                onClick={UpdateSiswa}
                className={`mx-3 rounded-[10px] mt-3 text-white
              box-border border border-transparent
              px-4 py-2.5 text-sm font-medium
              bg-blue-500
              hover:bg-blue-400`}
              >
                Update
              </button>
            )}
          </div>
          <div className="p-3">
            <h2 class="mb-2 text-lg font-medium text-heading">
              List of Student:
            </h2>
            <ul class="max-w-md space-y-1 text-body list-inside list-siswa">
              {siswa.length === 0 ? (
                <li className="text-gray-400">Belum ada siswa</li>
              ) : (
                siswa.map((item, index) => (
                  <li key={index} class="flex items-center">
                    <svg
                      class="w-4 h-4 text-fg-success me-1.5 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <div className="iconix">
                      {item.nama} | {item.npm}
                      <div className="mx-2" onClick={() => EditSiswa(item.npm)}>
                        <EditIcon />
                      </div>
                      <div className=" " onClick={() => DeleteSiswa(item.npm)}>
                        <DeleteIcon />
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
