$(document).ready(function () {

    $(document).on("click", "#analyze", handleAnalysis);

    function handleAnalysis() {
        event.preventDefault();
        let programInput = $("#programInput").val();
        let ecrInput = $("#ecrInput").val();

        if ((programInput === '') && !ecrInput) {
            renderEmpty()
            return;
        } else if (!ecrInput && (programInput != '')) {
            window.location.href = "/rfb/" + programInput
        } else {
            window.location.href = "/rfb/ecr/" + ecrInput
        }
    }

    // Function for handling what to render when there are no posts
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("You must enter a Program Number or else the Program/ECR is not found");
        $("#form-container").append(alertDiv);
    }
});