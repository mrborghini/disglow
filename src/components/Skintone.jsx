import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const SkinToneSelector = () => {
  const [selectedSkinTone, setSelectedSkinTone] = useState(null); // State for skin tone
  const [instagramHandle, setInstagramHandle] = useState(""); // State for Instagram handle
  const navigate = useNavigate();  // Initialize the useNavigate hook
  const [selectedUndertone, setSelectedUndertone] = useState(null); // State for undertone

  // Skin tones options (replace with image paths)
  const skinTones = [
    { id: 1, label: "1", imgSrc: "/MST Orbs/MST_1.png" },
    { id: 2, label: "2", imgSrc: "/MST Orbs/MST_2.png" },
    { id: 3, label: "3", imgSrc: "/MST Orbs/MST_3.png" },
    { id: 4, label: "4", imgSrc: "/MST Orbs/MST_4.png" },
    { id: 5, label: "5", imgSrc: "/MST Orbs/MST_5.png" },
    { id: 6, label: "6", imgSrc: "/MST Orbs/MST_6.png" },
    { id: 7, label: "7", imgSrc: "/MST Orbs/MST_7.png" },
    { id: 8, label: "8", imgSrc: "/MST Orbs/MST_8.png" },
    { id: 9, label: "9", imgSrc: "/MST Orbs/MST_9.png" },
    { id: 10, label: "10", imgSrc: "/MST Orbs/MST_10.png" }
  ];

  const undertones = [
    { id: "warm", label: "Warm", color: "#E8B566" },
    { id: "olive", label: "Olive", color: "#C4A95F" },
    { id: "neutral", label: "Neutral", color: "#C4A07F" },
    { id: "cool", label: "Cool", color: "#D1A38D" },
  ];

  // Handle skin tone selection
  const handleSkinToneSelect = (toneId) => {
    setSelectedSkinTone(toneId);
  };

  // Handle Instagram handle input
  const handleInstagramChange = (e) => {
    setInstagramHandle(e.target.value);
  };

  const handleUndertoneSelect = (toneId) => {
    setSelectedUndertone(toneId);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (!selectedSkinTone || !selectedUndertone) {
      alert("Please select both a skin tone and undertone before searching.");
    } else {
      // Redirect to ProductList with selected skin tone passed via state
      navigate('/product-list', { state: { selectedSkinTone, selectedUndertone } });
    }
  };

  return (
    <div 
      className="flex items-center justify-center h-screen w-screen" 
      style={{ backgroundImage: 'url(/bg.png)', backgroundSize: 'cover' }} // Set background image
    >
      <div className="flex flex-col items-center space-y-20">
        {/* Skin Tone Selector */}
        <div className="space-y-6 flex flex-col items-center">
          <h3 className="text-lg">
            How <span className="font-bold text-orange-600">deep</span> is your skin color?
          </h3>
          <div className="flex justify-center space-x-4">
            {skinTones.map((tone) => (
              <div
                key={tone.id}
                className={`w-12 h-12 cursor-pointer border-2 rounded-full ${ // Make border circular
                  selectedSkinTone === tone.id
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => handleSkinToneSelect(tone.id)}
              >
                {/* Display the image for each skin tone */}
                <img
                  src={tone.imgSrc}
                  alt={`Skin tone ${tone.label}`}
                  className="w-full h-full rounded-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Undertone Selector */}
        <div className="space-y-6 flex flex-col items-center">
          <h3 className="text-lg">What’s your <span className="font-bold text-orange-600">undertone</span>?</h3>
          <div className="flex justify-center space-x-4">
            {undertones.map((tone) => (
              <div
                key={tone.id}
                className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                  selectedUndertone === tone.id
                    ? "border-black"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: tone.color }}
                onClick={() => handleUndertoneSelect(tone.id)}
              >
                <span className="sr-only">{tone.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instagram Handle Input */}
        <div className="mt-4">
          <label className="block text-md font-medium text-gray-700">
            Enter your Instagram handle (optional):
          </label>
          <input
            type="text"
            value={instagramHandle}
            onChange={handleInstagramChange}
            placeholder="@yourhandle"
            className="mt-2 p-2 border rounded-md w-64"
          />
        </div>

        {/* Display Selected Skin Tone and Search Button */}
        <div className="mt-6 text-center">
          <p className="text-md">
            Selected Skin Tone: {selectedSkinTone || "None"}
          </p>
          <p className="text-md">
            Selected Undertone: {selectedUndertone || "None"}
          </p>
          <button 
            className="bg-cyan-600 text-yellow-200 rounded-md border-0 cursor-pointer mt-6 
                       font-bold text-lg leading-6 min-h-[44px] 
                       px-5 py-2 w-full transition-opacity duration-300 
                       hover:opacity-75"
            onClick={handleSearchClick}  // Trigger navigation on click
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkinToneSelector;
