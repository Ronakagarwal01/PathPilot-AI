import fs from 'fs';
import archiver from 'archiver';
import path from 'path';

// Create a file to stream archive data to.
const outputFilePath = path.join(process.cwd(), 'PathPilot-AI.zip');
const output = fs.createWriteStream(outputFilePath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('=======================================================');
  console.log(`✅ Success! Project has been fully zipped.`);
  console.log(`📁 File Name: PathPilot-AI.zip`);
  console.log(`📊 Total Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log('=======================================================');
  console.log('You can now download this ZIP file directly from your file explorer!');
});

// Good practice to catch warnings
archive.on('warning', function(err) {
  if (e.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

// Good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Append files from a sub-directory, putting its contents at the root of archive
archive.glob('**/*', {
  cwd: process.cwd(),
  ignore: ['node_modules/**', 'dist/**', 'PathPilot-AI.zip', '.git/**']
});

// Finalize the archive
archive.finalize();