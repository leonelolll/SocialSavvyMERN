import React from 'react'
import Layout from '../shared/Layout';
import "bootstrap/dist/css/bootstrap.min.css";
import s from "./settings.module.css"

function Settings() {

  return (
    <Layout>
      <div className={s.settings_container}>
        <div className="container light-style flex-grow-1 container-p-y">
          <h4 >
            Account settings
          </h4>
          <div className="card overflow-hidden">
            <div className="row no-gutters row-bordered row-border-light">
              <div className="col-md-3 pt-0">
                <div className="list-group list-group-flush account-settings-links">
                  <a className="list-group-item list-group-item-action active" data-toggle="list"
                    href="#account-social-links">Social links</a>
                  {/* <a className="list-group-item list-group-item-action" data-toggle="list"
                    href="#account-connections">Connections</a> */}
                </div>
              </div>
              <div className="col-md-9">
                <div className="tab-content">
                  <div className="tab-pane fade active show" id="account-social-links">
                    <div className="card-body pb-2">
                      <div className="form-group">
                        <label className="form-label">X</label>
                        <input type="text" className="form-control" value="https://x.com/user" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Facebook</label>
                        <input type="text" className="form-control" value="https://www.facebook.com/user" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Instagram</label>
                        <input type="text" className="form-control" value="https://www.instagram.com/user" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">TikTok</label>
                        <input type="text" className="form-control" value="https://www.tiktok.com/user" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right mt-4">
            <button type="button" className="btn btn-primary mr-3" style={{ minWidth: "220px", padding: "8px 16px 12px" }}>Save changes</button>
            <button type="button" className="btn btn-default ml-3" style={{ minWidth: "120px" }}>Cancel</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;