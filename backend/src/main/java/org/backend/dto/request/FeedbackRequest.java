package org.backend.dto.request;

public class FeedbackRequest {


    private Short rating;

    private String comments;


    public FeedbackRequest() {
    }


    public Short getRating() {
        return rating;
    }

    public void setRating(Short rating) {
        this.rating = rating;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }


}
