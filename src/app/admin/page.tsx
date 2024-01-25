'use client';
import React, { useState } from 'react';
import uploadImage from '../api/uploader';

export default function Adminpage() {
  const [file, setFile] = useState();
  const handleChange = (e) => {
    const { files } = e.target;
    if (files) setFile(files[0]);
    console.log(file);
  };
  const handleClick = (e) => {
    e.preventDefault();
    uploadImage(file);
  };
  return (
    <div>
      <input type='file' accept='image/*' onChange={handleChange} />
      <button onClick={handleClick}>button</button>
    </div>
  );
}
