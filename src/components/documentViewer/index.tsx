
function DocumentViewer({ open, handleModal, document } : any) {

    if(!open) return null;

  return (
    <>
     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
     <div className={`bg-white p-4  rounded-lg   w-full flex flex-col  max-h-[97%] h-fit overflow-y-scroll hide-scrollbar  ${document?.key === 'document' ? "max-w-3xl 2xl:max-w-4xl" : "max-w-lg"}`}>
     <div className="flex justify-between items-center border-b pb-2">
                        <h2 className="text-lg font-medium capitalize">{document?.key} Viewer</h2>
                        <button
                            type="button"
                            className="text-gray-600 hover:text-gray-900"
                            onClick={handleModal}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
        <div>
          {document?.key === 'document' ? (
            <iframe
              src={`${document?.val}`}
              style={{ width: '100%', height: '650px', border: 'none' }}
              title="Document Viewer"
            />
          ) : document?.key === 'image' ? (
            <img
              src={document?.val}
              style={{ width: '100%', height: '100%', border: 'none' }}
              alt="Image Viewer"
            />
          ) : document?.key === 'video' ? (
            <video
              src={document?.val}
              controls
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Video Player"
            >
              Sorry, your browser doesn't support embedded videos.
            </video>
          ) : document?.key === 'word' ? (
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${document?.val}`}
              style={{ width: '100%', height: '650px', border: 'none' }}
              title="Word Document Viewer"
            />
          ) : document?.key === 'excel' ? (
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${document?.val}`}
              style={{ width: '100%', height: '650px', border: 'none' }}
              title="Excel Document Viewer"
            />
          ) : document?.key === 'csv' ? (
            <iframe
              src={document?.val}
              style={{ width: '100%', height: '650px', border: 'none' }}
              title="CSV File Viewer"
            />
          ) : (
            <p>Unsupported file type </p>
          )}

        </div>
      </div>
      </div>
    </>
  );
}

export default DocumentViewer;
