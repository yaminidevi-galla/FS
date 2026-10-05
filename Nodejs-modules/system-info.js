const os = require('os');
const path = require('path');
const dns = require('dns');
const net = require('net');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 1. Operating System Information
console.log("===== SYSTEM INFORMATION =====");

console.log("Operating System Platform:", os.platform());
console.log("CPU Architecture:", os.arch());

console.log("\nCPU Information:");
const cpuInfo = os.cpus();

console.log("CPU Model:", cpuInfo[0].model);
console.log("Number of CPU Cores:", cpuInfo.length);
console.log("CPU Speed:", cpuInfo[0].speed, "MHz");

console.log("\nMemory Information:");
console.log(
    "Total Memory:",
    (os.totalmem() / (1024 ** 3)).toFixed(2),
    "GB"
);

console.log(
    "Free Memory:",
    (os.freemem() / (1024 ** 3)).toFixed(2),
    "GB"
);

// 2. Path Module
rl.question("\nEnter a file path: ", (filePath) => {

    console.log("\n===== PATH INFORMATION =====");

    console.log("Directory Name:", path.dirname(filePath));
    console.log("File Name:", path.basename(filePath));
    console.log("Extension:", path.extname(filePath));
    console.log("Normalized Path:", path.normalize(filePath));

    // 3. DNS Module
    rl.question("\nEnter a domain name: ", (domain) => {

        console.log("\n===== DNS INFORMATION =====");

        dns.lookup(domain, (err, address, family) => {

            if (err) {
                console.log("DNS Lookup Error:", err.message);
            } else {
                console.log("Domain Name:", domain);
                console.log("IP Address:", address);
                console.log("IP Version: IPv" + family);
            }

            // Close readline interface
            rl.close();

            // 4. NET Module - TCP Server
            const server = net.createServer((socket) => {

                console.log("\n===== TCP SERVER =====");
                console.log("Client connected.");

                socket.write(
                    "Welcome to the Node.js TCP Server!"
                );

                socket.on('end', () => {
                    console.log("Client disconnected.");
                });
            });

            const PORT = 5000;

            server.listen(PORT, () => {
                console.log(
                    `TCP Server is running on port ${PORT}`
                );
                console.log(
                    "Connect using a TCP client such as Telnet or Netcat."
                );
            });

            server.on('error', (err) => {
                console.log("Server Error:", err.message);
            });
        });
    });
});