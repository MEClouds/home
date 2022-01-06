import React, { Component } from "react";
// to do change skills to cert
// go to json and cert attributes
class Cert extends Component {
  render() {
    if (this.props.sharedCert && this.props.resumeBasicInfo) {
      var sectionName = this.props.resumeBasicInfo.section_name.cert;
      var cert = this.props.sharedCert.icons.map(function (cert, i) {
        return (
          <li className="list-inline-item mx-3" key={i}>
            <span className="cert-card">
            <a href={cert.link}>
              <div className="text-center cert">
                {/* image logo src
                  name 
                  link to certificate */}
                <span class="iconify" data-icon={cert.logo} style={{ fontSize: "300%"  }}>
                  </span>
                  
                  <p
                    className="text-center"
                    style={{ fontSize: "70%", marginTop: "4px" }}
                  >
                    {cert.name}
                  </p>
              </div>
              </a>
            </span>
          </li>
        );
      });
    }

    return (
      <section id="skills">
        <div className="col-md-12">
          <div className="col-md-12">
            <h1 className="section-title">
              <span className="text-white">certificates</span>
            </h1>
          </div>
          <div className="col-md-12 text-center">
            <ul className="list-inline mx-auto skill-icon">{cert}</ul>
          </div>
        </div>
      </section>
    );
  }
}

export default Cert;
