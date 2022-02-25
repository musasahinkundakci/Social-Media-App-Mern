import React from 'react';
import './css/notfound.scss';
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div>
      <div className="notfound">
        <div class="box">
          <div class="box__ghost">
            <div class="symbol"></div>
            <div class="symbol"></div>
            <div class="symbol"></div>
            <div class="symbol"></div>
            <div class="symbol"></div>
            <div class="symbol"></div>

            <div class="box__ghost-container">
              <div class="box__ghost-eyes">
                <div class="box__eye-left"></div>
                <div class="box__eye-right"></div>
              </div>
              <div class="box__ghost-bottom">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div class="box__ghost-shadow"></div>
          </div>

          <div class="box__description">
            <div class="box__description-container">
              <div class="box__description-title">Whoops!</div>
              <div class="box__description-text">
                Biraz kaybolmuşa benziyorsunuz...
              </div>
            </div>

            <Link to="/" class="box__button">
              Ana sayfaya yönlendir
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
