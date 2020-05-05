import React from 'react';
import '../App.css';


/**
* props = {
  header: header,
  body: [
     {text: "asdf", link: "http://link.com"}
  ]
}
*/
function Help() {
  return (
    <div className="search-result-body">

      <div className="search-result-header">
        Daily Bruin's Copy Style Guide
      </div>

      <div className="search-result-results">
        <p>Use the search bar above to find entries. Click on a section on the left view results only from that section</p>
        
        <h3> Keyboard shortcuts </h3>
        <table className="shortcuts-table">
          <tr className="header">
            <th>Action</th>
            <th>Windows</th> 
            <th>Mac</th>
          </tr>
          <tr>
            <td>Focus on search input</td>
            <td>Control L</td>
            <td>⌘L</td>
          </tr>
          <tr>
            <td>Clear query</td>
            <td>Control K</td>
            <td>⌘K</td>
          </tr>
          <tr>
            <td>Search</td>
            <td>Enter</td>
            <td>Enter</td>
          </tr>
        </table>
        
        <h3> Editing entries </h3>
        <p> 
          Go to the <a href="hoot.dailybruin.com/django/admin/">admin</a> side. Then click on Style Guide Entries. From there you can create new entries or edit existing ones.
          The entries use <a href="https://markdown-here.com/livedemo.html">Markdown</a> to format content.
        </p>
        <h4> Embedding PDFS </h4>
        <ol>
          <li> Upload PDF to google drive </li>
          <li> Make sure Link Sharing is enable </li>
          <li> Click the ... in the top right and click embed </li>
          <li> 
            Copy paste the &lt;iframe stuff. It should look something like this
            <p>
             <span className="monospaced">
              &lt;iframe src=&quot;https://drive.google.com/file/d/1bEQKDsmJliDbYrVBkqa1g0Ph2Qyzb_HO/preview&quot; width=&quot;640&quot; height=&quot;480&quot;&gt;&lt;/iframe&gt;
             </span>
            </p>
          </li>
          <li> Paste that in the 'content' text area for a style guide entry! </li>
        </ol>
        <h4> Images </h4>
        <p> Simply drag and drop the image into the content text area. It will uinsert the markdown for embeding the image and upload it for you. </p>
        <h4> Colors </h4>
        <p> Try copy pasting this blue coloring snippet: <span className="monospaced"> &lt;span style=&quot;color:blue&quot;&gt;some blue text&lt;/span&gt; </span> </p>
        <p> You can also use hex colors: <span className="monospaced">&lt;span style=&quot;color:#7FFFD4&quot;&gt;some aqua text&lt;/span&gt; </span> </p>

        <h3> Bugs </h3>
        <p> 
          If you find any bugs, feel free to slack Neil Prajapati (the internal tools editor). 
          Its always helpful when people report bugs! It makes fixing things faster and easier.
        </p>
      </div>
    </div>
  );
}

export default Help;
