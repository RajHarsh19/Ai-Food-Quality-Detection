import axios from "axios";
import { useState } from "react";

function App() {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {

    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    setPreview(
      URL.createObjectURL(selectedFile)
    );
  };

  const uploadImage = async () => {

    if (!file) {
      alert("Please select image");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert("Prediction failed");
    }

    setLoading(false);
  };

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-orange-100
      via-white
      to-green-100
    "
    >

      {/* HERO SECTION */}

      <div
        className="
        text-center
        py-16
        px-6
      "
      >

        <h1
          className="
          text-6xl
          font-extrabold
          text-gray-800
          mb-6
        "
        >
          AI Food Quality Detection
        </h1>

        <p
          className="
          text-xl
          text-gray-600
          max-w-3xl
          mx-auto
        "
        >
          Detect food freshness using
          Artificial Intelligence,
          Computer Vision, and Deep
          Learning technology.
        </p>

      </div>

      {/* MAIN CONTENT */}

      <div
        className="
        max-w-5xl
        mx-auto
        bg-white/70
        backdrop-blur-lg
        rounded-3xl
        shadow-2xl
        p-10
      "
      >

        <div
          className="
          grid
          md:grid-cols-2
          gap-10
          items-center
        "
        >

          {/* LEFT SECTION */}

          <div>

            <h2
              className="
              text-4xl
              font-bold
              text-gray-800
              mb-4
            "
            >
              Upload Food Image
            </h2>

            <p
              className="
              text-gray-600
              mb-8
            "
            >
              Our AI model analyzes
              freshness, spoilage,
              and food quality instantly.
            </p>

            <input
              type="file"
              onChange={handleFileChange}
              className="
              mb-6
              block
            "
            />

            <button
              onClick={uploadImage}
              className="
              bg-gradient-to-r
              from-orange-500
              to-red-500
              text-white
              px-8
              py-3
              rounded-xl
              text-lg
              font-semibold
              shadow-lg
              hover:scale-105
              transition
            "
            >
              Analyze Food
            </button>

            {loading && (

              <div
                className="
                mt-6
                text-lg
                text-blue-600
                animate-pulse
              "
              >
                AI analyzing image...
              </div>

            )}

            {result && (

              <div
                className="
                mt-8
                bg-gray-100
                rounded-2xl
                p-6
              "
              >

                <h3
                  className="
                  text-2xl
                  font-bold
                  mb-4
                "
                >
                  Prediction Result
                </h3>

                <div className="mb-4">

                  <span
                    className="
                    bg-green-500
                    text-white
                    px-5
                    py-2
                    rounded-full
                    text-lg
                    font-semibold
                  "
                  >
                    {result.prediction}
                  </span>

                </div>

                <p
                  className="
                  text-lg
                  mb-3
                "
                >
                  Confidence:
                  {" "}
                  {result.confidence}%
                </p>

                <div
                  className="
                  w-full
                  bg-gray-300
                  rounded-full
                  h-5
                "
                >

                  <div
                    className="
                    bg-green-500
                    h-5
                    rounded-full
                  "
                    style={{
                      width:
                        `${result.confidence}%`
                    }}
                  ></div>

                </div>

                {/* FEATURE CARDS */}

                <div
                  className="
                  grid
                  md:grid-cols-3
                  gap-4
                  mt-8
                "
                >

                  <div
                    className="
                    bg-white
                    shadow-lg
                    rounded-2xl
                    p-5
                    text-center
                  "
                  >

                    <h2
                      className="
                      text-xl
                      font-bold
                      mb-2
                      text-gray-800
                    "
                    >
                      AI Detection
                    </h2>

                    <p className="text-gray-500">
                      CNN-based food image analysis
                    </p>

                  </div>

                  <div
                    className="
                    bg-white
                    shadow-lg
                    rounded-2xl
                    p-5
                    text-center
                  "
                  >

                    <h2
                      className="
                      text-xl
                      font-bold
                      mb-2
                      text-gray-800
                    "
                    >
                      Freshness Score
                    </h2>

                    <p className="text-gray-500">
                      Confidence-driven quality check
                    </p>

                  </div>

                  <div
                    className="
                    bg-white
                    shadow-lg
                    rounded-2xl
                    p-5
                    text-center
                  "
                  >

                    <h2
                      className="
                      text-xl
                      font-bold
                      mb-2
                      text-gray-800
                    "
                    >
                      Deep Learning
                    </h2>

                    <p className="text-gray-500">
                      Powered by AI computer vision
                    </p>

                  </div>

                </div>

              </div>

            )}

          </div>

          {/* RIGHT SECTION */}

          <div className="text-center">

            {preview ? (

              <img
                src={preview}
                alt="preview"
                className="
                rounded-3xl
                shadow-2xl
                mx-auto
                w-full
                max-w-md
              "
              />

            ) : (

              <img
                src="https://images.unsplash.com/photo-1498837167922-ddd27525d352"
                alt="food"
                className="
                rounded-3xl
                shadow-2xl
                mx-auto
              "
              />

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default App;