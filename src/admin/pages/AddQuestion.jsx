import React from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaLink,
  FaRedoAlt,
} from "react-icons/fa";
import { LuHeading1, LuHeading2 } from "react-icons/lu";

const ToolbarButton = ({ Icon, onClick }) => (
  <button
    onClick={onClick}
    className="p-1 rounded hover:bg-blue-800 transition cursor-pointer"
  >
    <Icon size={18} />
  </button>
);

const Toolbar = ({ onBold, onItalic, onUnderline, onH1, onH2, onUl, onOl, onLink, onRedo }) => (
  <div className="bg-blue-900 text-white rounded-t-lg p-2 flex gap-3 text-sm">
    <ToolbarButton Icon={FaBold} onClick={onBold} />
    <ToolbarButton Icon={FaItalic} onClick={onItalic} />
    <ToolbarButton Icon={FaUnderline} onClick={onUnderline} />
    <ToolbarButton Icon={LuHeading1} onClick={onH1} />
    <ToolbarButton Icon={LuHeading2} onClick={onH2} />
    <ToolbarButton Icon={FaListUl} onClick={onUl} />
    <ToolbarButton Icon={FaListOl} onClick={onOl} />
    <ToolbarButton Icon={FaLink} onClick={onLink} />
    <ToolbarButton Icon={FaRedoAlt} onClick={onRedo} />
  </div>
);

const AddQuestion = () => {
  const handleBold = () => alert("Bold clicked");
  const handleItalic = () => alert("Italic clicked");
  const handleUnderline = () => alert("Underline clicked");
  const handleH1 = () => alert("H1 clicked");
  const handleH2 = () => alert("H2 clicked");
  const handleUl = () => alert("UL clicked");
  const handleOl = () => alert("OL clicked");
  const handleLink = () => alert("Link clicked");
  const handleRedo = () => alert("Redo clicked");

  const renderOption = (index) => (
    <div className="space-y-1" key={index}>
      <label className="font-medium">{`Option ${index + 1}`}</label>
      <Toolbar
        onBold={handleBold}
        onItalic={handleItalic}
        onUnderline={handleUnderline}
        onH1={handleH1}
        onH2={handleH2}
        onUl={handleUl}
        onOl={handleOl}
        onLink={handleLink}
        onRedo={handleRedo}
      />
      <textarea
        className="w-full bg-blue-50 border border-blue-200 p-3 h-24 resize-none rounded-b-lg focus:outline-none"
        placeholder={`Type option ${index + 1} here...`}
      ></textarea>
      <label className="inline-flex items-center space-x-2 mt-2 text-sm">
        <input type="radio" name="answer" className="accent-blue-600" />
        <span>Mark As Answer</span>
      </label>
    </div>
  );

  return (
    <div className="bg-white p-4 md:p-6 text-gray-800 max-h-[80vh] overflow-hidden flex flex-col font-poppins">
      <nav className="text-blue-600 text-sm mb-2">Add Question</nav>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 pb-4">
        {/* Dropdowns */}
        <div className="flex flex-wrap gap-4">
          <select className="bg-gray-100 border border-gray-200 rounded-lg p-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Select Category</option>
          </select>
          <select className="bg-gray-100 border border-gray-200 rounded-lg p-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Select Subcategory</option>
          </select>
          <select className="bg-gray-100 border border-gray-200 rounded-lg p-2 flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Select Topic</option>
          </select>
        </div>

        {/* Question */}
        <div className="space-y-1">
          <label className="font-medium">Question</label>
          <Toolbar
            onBold={handleBold}
            onItalic={handleItalic}
            onUnderline={handleUnderline}
            onH1={handleH1}
            onH2={handleH2}
            onUl={handleUl}
            onOl={handleOl}
            onLink={handleLink}
            onRedo={handleRedo}
          />
          <textarea
            className="w-full bg-blue-50 border border-blue-200 p-3 h-32 resize-none rounded-b-lg focus:outline-none"
            placeholder="Type your question here..."
          ></textarea>
        </div>

        {/* 4 Options */}
        {[0, 1, 2, 3].map((index) => renderOption(index))}

        {/* Explanation */}
        <div className="space-y-1">
          <label className="font-medium">Explanation (Optional)</label>
          <Toolbar
            onBold={handleBold}
            onItalic={handleItalic}
            onUnderline={handleUnderline}
            onH1={handleH1}
            onH2={handleH2}
            onUl={handleUl}
            onOl={handleOl}
            onLink={handleLink}
            onRedo={handleRedo}
          />
          <textarea
            className="w-full bg-blue-50 border border-blue-200 p-3 h-24 resize-none rounded-b-lg focus:outline-none"
            placeholder="Type explanation here..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
