import React, { useState, useEffect } from 'react';
import './ContentAnalysis.css';
import SideNav from './SideNav';
import Top from './Top';
import ResultInstagram from './ResultInstagram';
import ResultTiktok from './ResultTiktok';
import ResultFacebook from './ResultFacebook';

function ContentAnalysis() {
    const [searchText, setSearchText] = useState('');
    const [sortFilterVisible, setSortFilterVisible] = useState(false);
    const [sortBy, setSortBy] = useState('likes');
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [posts, setPosts] = useState([]);  // Initially empty
    const [selectedPlatform, setSelectedPlatform] = useState('');

    useEffect(() => {
        // Fetch data from result.json when the component mounts
        fetch('/Backend/result.json')
            .then(response => response.json())
            .then(data => {
                const formattedPosts = data.map((post) => ({
                    ...post,
                    likes: nFormatter(post.likes),
                    views: nFormatter(post.views),
                    comments: nFormatter(post.comments),
                }));
                setPosts(formattedPosts);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const confirmLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to log out?');
        if (confirmLogout) {
            window.location.href = 'login.html';
        }
    };

    const handleSearch = () => {
        if (!searchText) {
            alert('Search field cannot be empty');
            return;
        }
        if (!searchText.startsWith('@') && !searchText.startsWith('#')) {
            alert("Search query must start with '@' or '#'!");
            return;
        }

        setPosts(
            posts.map((post) => ({
                ...post,
                username: searchText.startsWith('@') ? searchText.slice(1) : post.username,
            }))
        );

        document.getElementById('blankContainer').style.display = 'grid';
    };

    function toggleSortFilter() {
        var x = document.getElementById("sortFilter");
        var button = document.querySelector(".sort-button img"); // Select the image inside the button
        if (x.style.display === "none") {
            x.style.display = "block";
            button.src = "images/up.svg"; // Change the image source to the up arrow
        } else {
            x.style.display = "none";
            button.src = "images/down.svg"; // Change the image source to the down arrow
        }
    }


    const resetFilter = () => {
        setSortBy('likes');
        setMinDate('');
        setMaxDate('');
    };

    const handleViewButtonClick = () => {
        const selectedRadio = document.querySelector('input[name="radio"]:checked');
        if (!selectedRadio) {
            console.log('No radio button is checked!');
            return;
        }

        const platform = selectedRadio.value;
        const confirmMsg = window.confirm(`Open on ${platform}?`);
        if (confirmMsg) {
            window.open(`https://${platform.toLowerCase()}.com`, '_blank');
        }
    };

    const nFormatter = (num) => {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return num;
    };

    const handleSortFilterSubmit = () => {
        alert('filter applied!');

        let sortedPosts = [...posts];
        if (sortBy === 'views') {
            sortedPosts.sort((a, b) => extractNumericValue(b.views) - extractNumericValue(a.views));
        } else if (sortBy === 'likes') {
            sortedPosts.sort((a, b) => extractNumericValue(b.likes) - extractNumericValue(a.likes));
        } else if (sortBy === 'comments') {
            sortedPosts.sort((a, b) => extractNumericValue(b.comments) - extractNumericValue(a.comments));
        }

        const minDateObj = new Date(minDate || '2000-01-01');
        const maxDateObj = new Date(maxDate || '2024-12-31');

        sortedPosts = sortedPosts.filter((post) => {
            const postDate = new Date(post.date);
            return postDate >= minDateObj && postDate <= maxDateObj;
        });

        setPosts(sortedPosts);
        setSortFilterVisible(false);
    };

    const extractNumericValue = (str) => {
        const numericPart = str.replace(/[^\d.]/g, '');
        let magnitude = 1;
        if (str.endsWith('M')) {
            magnitude = 1000000;
        } else if (str.endsWith('k')) {
            magnitude = 1000;
        }
        return parseFloat(numericPart) * magnitude;
    };

    const handleRadioChange = (event) => {
        setSelectedPlatform(event.target.value);
    };

    return (
        <div>
            <SideNav />
            <div className="background">
                <Top />

                <div className="container">
                    <h2>Viral Search</h2>
                    <div className="search-box">
                        <input
                            type="text"
                            className="search-bar"
                            id="search-bar"
                            placeholder="@Username/#Hashtag"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <button className="search-btn" id="searchbtn" onClick={handleSearch}>
                            <img src="images/search.svg" alt="Search" />
                        </button>
                    </div>

                    <div className="radio-box">
                        <label className="radio-button">
                            <input 
                                type="radio" 
                                name="radio" 
                                value="Instagram" 
                                onChange={handleRadioChange} 
                                checked={selectedPlatform === 'Instagram'} // Optionally add checked attribute to mark the selected platform
                            />
                            <span className="checkmark"></span>Instagram
                        </label>
                        <label className="radio-button">
                            <input 
                                type="radio" 
                                name="radio" 
                                value="Tiktok" 
                                onChange={handleRadioChange} 
                                checked={selectedPlatform === 'Tiktok'} // Optionally add checked attribute to mark the selected platform
                            />
                            <span className="checkmark"></span>Tiktok
                        </label>
                        <label className="radio-button">
                            <input 
                                type="radio" 
                                name="radio" 
                                value="Facebook" 
                                onChange={handleRadioChange} 
                                checked={selectedPlatform === 'Facebook'} // Optionally add checked attribute to mark the selected platform
                            />
                            <span className="checkmark"></span>Facebook
                        </label>
                    </div>


                    <div className="sort-container">
                        <li>
                            <img src="images/sort.svg" alt="Sort" />
                            <p>sort & filter</p>
                            <button className="sort-button" id="sortbtn" onClick={toggleSortFilter}>
                                <img src="images/down.svg" alt="Dropdown" />
                            </button>
                        </li>
                        {sortFilterVisible && (
                            <div id="sortFilter">
                                <div id="sort-content">
                                    <div>
                                        <p>sort by:</p>
                                        <select
                                            name="sortby"
                                            id="sortby"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="likes">likes</option>
                                            <option value="views">views</option>
                                            <option value="comments">comments</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p>posted after:</p>
                                        <input
                                            type="date"
                                            id="mindate"
                                            name="mindate"
                                            value={minDate}
                                            onChange={(e) => setMinDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>posted before:</p>
                                        <input
                                            type="date"
                                            id="maxdate"
                                            name="maxdate"
                                            value={maxDate}
                                            onChange={(e) => setMaxDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="submitbtn">
                                    <button id="reset-button" onClick={() => resetFilter()}>reset filter</button>
                                    <button id="submit-button" onClick={() => handleSortFilterSubmit()}>submit filter</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Display ResultInstagram, ResultTiktok, or ResultFacebook based on selected radio button */}
                {selectedPlatform === 'Instagram' && <ResultInstagram posts={posts} selectedRadio={selectedPlatform} />}
                {selectedPlatform === 'Tiktok' && <ResultTiktok posts={posts} selectedRadio={selectedPlatform}/>}
                {selectedPlatform === 'Facebook' && <ResultFacebook posts={posts} selectedRadio={selectedPlatform}/>}
            </div>
        </div>
    );
}

export default ContentAnalysis;
