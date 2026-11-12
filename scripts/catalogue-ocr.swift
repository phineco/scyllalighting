import Foundation
import Vision
import ImageIO

// Local-only source review. Output is internal and must not be served publicly.
for path in CommandLine.arguments.dropFirst() {
    guard let source = CGImageSourceCreateWithURL(URL(fileURLWithPath: path) as CFURL, nil),
          let image = CGImageSourceCreateImageAtIndex(source, 0, nil) else { continue }
    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.recognitionLanguages = ["en-US"]
    request.usesLanguageCorrection = false
    do {
        try VNImageRequestHandler(cgImage: image).perform([request])
        let rows: [[String: Any]] = (request.results ?? []).compactMap { observation in
            guard let text = observation.topCandidates(1).first?.string else { return nil }
            let rect = observation.boundingBox
            return ["text": text, "x": rect.minX, "y": 1 - rect.maxY,
                    "w": rect.width, "h": rect.height]
        }
        let data = try JSONSerialization.data(withJSONObject: rows, options: [.prettyPrinted, .sortedKeys])
        try data.write(to: URL(fileURLWithPath: path + ".ocr.json"))
        print(URL(fileURLWithPath: path).lastPathComponent, rows.count)
    } catch { fputs("OCR failed: \(URL(fileURLWithPath: path).lastPathComponent): \(error.localizedDescription)\n", stderr) }
}
