"use client";

import Image from "next/image";
import { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData()
          formData.append('file', file)  

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          
          });
          const data = await response.json();
          console.log(data);
          setImageUrl(data.url)
        }}
      >
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button>Enviar</button>
      </form>
      {
        imageUrl && (
          <img src={imageUrl} alt="" />
        )
      }
    </div>
  );
}
