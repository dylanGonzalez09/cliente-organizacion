'use client';
import { useEffect, useState } from 'react';

const URL = 'http://192.168.1.224:4000/api/file';

const getFile = async (setFileContent) => {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    setFileContent(data);
  } catch (error) {
    throw error;
  }
};

const handleSubmit = async (e, contentForm, setFileContent, setContentForm) => {
  e.preventDefault();

  try {
    if (contentForm === '') return;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newInfo: contentForm }),
    };

    const res = await fetch(URL, options);
    const data = await res.json();
    setFileContent(data);
    setContentForm('');
  } catch (error) {
    throw error;
  }
};

export default function Home() {
  const [fileContent, setFileContent] = useState({ msg: '', content: '' });
  const [contentForm, setContentForm] = useState('');

  useEffect(() => {
    (async () => {
      await getFile(setFileContent);
    })();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24 gap-40">
      <h1 className="text-4xl font-bold">Manager de Archivo</h1>
      <div className="w-6/12 flex flex-col items-center gap-5">
        <h2 className="text-2xl font-semibold">Contenido del archivo</h2>
        <p className="flex flex-col items-center text-2xl">
          Mensaje informativo del servidor:{' '}
          <span className="text-xl text-yellow-200">{fileContent.msg}</span>
        </p>
        {fileContent.content && (
          <p className="flex flex-col items-center text-2xl">
            Contenido del archivo localizado en el servidor:{' '}
            <span className="text-yellow-200 text-xl">
              {fileContent.content}
            </span>
          </p>
        )}
      </div>
      <div className="w-6/12">
        <form
          onSubmit={(e) =>
            handleSubmit(e, contentForm, setFileContent, setContentForm)
          }
        >
          <div className="flex flex-col w-full items-center">
            <label className="text-2xl font-bold mb-2">
              Agrega Contenido al Archivo
            </label>
            <textarea
              placeholder="Ingresa el contenido de tu archivo aqui..."
              className="rounded-md p-1 w-full text-gray-600 placeholder-black outline-none mb-5 text-xl"
              onChange={(e) => setContentForm(e.target.value)}
              value={contentForm}
            ></textarea>
            <button
              type="submit"
              className={`bg-blue-900 rounded-lg p-2 font-bold text-xl hover:bg-blue-600 transition-colors duration-300`}
            >
              Enviar al Servidor
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
