import { Divider, TextField } from "@mui/material";

function SettingsWorkbook() {
  return (
    <>
      <div>
        <h1 className="text-xl py-8 px-4">Workbook</h1>
        <Divider></Divider>
        <div className="flex justify-center p-4">

          <h1 className="font-bold">Project name:</h1>
          <TextField

            className="pb-4"
            /*value={projectName}
            onChange={(e) => setProjectName(e.target.value)}*/
          >
          </TextField>

          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-400">Create</button>


        </div>
        <Divider></Divider>
        <div className="flex justify-end pb-4 pr-4">
          <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-400"
            onClick={() => setOpenDialog(false)}
          >
            Close
          </button>
         
          
        </div>
      </div>
    </>
  );
}

export default SettingsWorkbook;