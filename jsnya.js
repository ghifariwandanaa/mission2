document.addEventListener("DOMContentLoaded", function () {
    const allMembersList = document.getElementById("allMembersList");
    const myFriendsList = document.getElementById("myFriendsList");
    const myFriendsHeader = document.getElementById("myFriendsHeader");

    let numFriends = 1; // Inisialisasi hitungan teman

    function updateMyFriendsCount() {
      myFriendsHeader.textContent = `My Friends (${numFriends})`; // Update teks header
    }

    function createFriendItem(memberId, memberName, isFollowing) {
      const friendItem = document.createElement("li");
      friendItem.setAttribute("data-id", memberId);

      const memberText = document.createTextNode(`${memberName} `);
      friendItem.appendChild(memberText);

      const followBtn = document.createElement("button");
      followBtn.className = isFollowing ? "unfollowBtn" : "followBtn";
      followBtn.textContent = isFollowing ? "Unfollow" : "Follow";

      friendItem.appendChild(followBtn);
      return friendItem;
    }

    allMembersList.addEventListener("click", function (event) {
      if (event.target.classList.contains("followBtn")) {
        const memberItem = event.target.closest("li");
        const memberId = memberItem.getAttribute("data-id");
        const memberName = memberItem.firstChild.textContent.trim();

        const friendItem = createFriendItem(memberId, memberName, true);
        myFriendsList.appendChild(friendItem);
        memberItem.remove();
        numFriends++;
        updateMyFriendsCount();
      }
    });

    myFriendsList.addEventListener("click", function (event) {
      if (event.target.classList.contains("unfollowBtn")) {
        const friendItem = event.target.closest("li");
        const memberId = friendItem.getAttribute("data-id");
        const memberName = friendItem.firstChild.textContent.trim();

        const memberItem = createFriendItem(memberId, memberName, false);
        allMembersList.appendChild(memberItem);
        friendItem.remove();
        numFriends--; // Kurangkan hitungan teman
        updateMyFriendsCount(); // Perbarui teks header
      }
    });

    // Panggil fungsi updateMyFriendsCount saat halaman dimuat untuk pertama kali
    updateMyFriendsCount();
});
