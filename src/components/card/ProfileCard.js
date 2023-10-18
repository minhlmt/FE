import React from 'react'
import { Link } from 'react-router-dom'

const ProfileCard = () => {
    return (
        <section style={{ backgroundColor: "#9de2ff", height: "250px", borderRadius: "30px" }}>
            <div class="container custom_py-5 h-100">
                <div class="row d-flex align-items-center">
                    <div class="col col-md-9 col-lg-7 col-xl-5">
                        <div class="card" style={{ borderRadius: "15px" }}>
                            <div style={{ height: "150px" }} class="card-body p-4">
                                <div class="d-flex text-black">
                                    <Link to='/minhquang/profile' class="flex-shrink-0">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                            alt="Generic placeholder image" class="img-fluid"
                                            style={{ width: "100px", height: "80px", objectFit: "cover" }} />
                                    </Link>
                                    <div class="flex-grow-1 ms-3">
                                        <Link style={{textDecoration:"none",color:"rgba(0,0,0,0.6)"}} to='/minhquang/profile'>
                                            <h5 class="mb-1">Danny McLoan</h5>
                                        </Link>
                                        <p class="mb-2 pb-1" style={{ color: "#2b2a2a" }}>Senior Journalist</p>
                                        <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                                            style={{ backgroundColor: "#efefef" }}>
                                            <div>
                                                <p class="small text-muted mb-1">Articles</p>
                                                <p class="mb-0">41</p>
                                            </div>
                                            <div class="px-3">
                                                <p class="small text-muted mb-1">Followers</p>
                                                <p class="mb-0">976</p>
                                            </div>
                                        </div>
                                        <div class="d-flex pt-1">
                                            <button type="button" class="btn btn-primary flex-grow-1">Theo dõi</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileCard