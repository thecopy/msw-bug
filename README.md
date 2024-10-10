# msw-bug


When MSW is disabled:
```
❯ node index.cjs
Server is running on port 51244
Response = Hello World
```

When MSW is enabled:
```
❯ node index.cjs
Server is running on port 51244
[Error: Parse Error: Invalid method encountered] {
  bytesParsed: 3,
  code: 'HPE_INVALID_METHOD',
  reason: 'Invalid method encountered',
  rawPacket: <Buffer 0d 0a 48 6f 73 74 3a 20 6c 6f 63 61 6c 68 6f 73 74 3a 35 31 32 34 34 0d 0a 41 63 63 65 70 74 2d 45 6e 63 6f 64 69 6e 67 3a 20 67 7a 69 70 2c 20 64 65 ... 143 more bytes>
}
"
Host: localhost:51244
Accept-Encoding: gzip, deflate
content-type: multipart/form-data; boundary=--------------------------506525977784982220171228
Content-Length: 3693
Connection: close
"
Bad Request
```

NOTE: There is no HTTP starting line! It is missing `POST /test HTTP/1.1`
