/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const WelcomePage = () => {
  return (
    <div className="flex flex-col h-screen bg-cover bg-center"
         style={{ backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/000/561/500/original/chat-app-logo-icon-vector.jpg")' }}>
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">Get Started</h2>
          <p className="mb-4">Click below to enter the chat application.</p>
          <Link to="/chat">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Enter Chat App
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WelcomePage;
