import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const SkinToneSelector = () => {
  const [selectedSkinTone, setSelectedSkinTone] = useState(null);
  const [selectedUndertone, setSelectedUndertone] = useState(null);
  const navigate = useNavigate();  // Initialize the useNavigate hook

  const skinTones = [
    { id: 1, label: "1", color: "#F4E2D8" },
    { id: 2, label: "2", color: "#E6C3A1" },
    { id: 3, label: "3", color: "#D2A67F" },
    { id: 4, label: "4", color: "#B78462" },
    { id: 5, label: "5", color: "#9C643F" },
    { id: 6, label: "6", color: "#7E4A2E" },
    { id: 7, label: "7", color: "#4B2C1B" },
    { id: 8, label: "8", color: "#3B1F14" },
  ];

  const undertones = [
    { id: "warm", label: "Warm", color: "#E8B566" },
    { id: "olive", label: "Olive", color: "#C4A95F" },
    { id: "neutral", label: "Neutral", color: "#C4A07F" },
    { id: "cool", label: "Cool", color: "#D1A38D" },
  ];

  const handleSkinToneSelect = (toneId) => {
    setSelectedSkinTone(toneId);
  };

  const handleUndertoneSelect = (toneId) => {
    setSelectedUndertone(toneId);
  };

  const handleSearchClick = () => {
    // Redirect to ProductList after the user selects tones
    navigate('/product-list', { state: { selectedSkinTone, selectedUndertone } });
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex flex-col items-center space-y-20">
        <div className="space-y-6 flex flex-col items-center">
          <h3 className="text-lg">
            How <span className="font-bold text-orange-600">deep</span> is your skin color?
          </h3>
          <div className="flex justify-center space-x-4">
            {skinTones.map((tone) => (
              <div
                key={tone.id}
                className={`w-12 h-12 rounded-full cursor-pointer border-2 ${
                  selectedSkinTone === tone.id
                    ? "border-black"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: tone.color }}
                onClick={() => handleSkinToneSelect(tone.id)}
              >
                <span className="sr-only">{tone.label}</span>
              </div>
            ))}
          </div>
        </div>
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
