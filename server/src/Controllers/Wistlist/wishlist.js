const Wishlistmodal = require("../../model/Wishlist");

const postwistlist = async (req, res) => {
  try {
    const { roomId, status } = req.body;
    const UserId = req.user.user._id;

    let wishlist = await Wishlistmodal.findOne({ UserId });

    if (!wishlist) {
      if (status) {
        // Create new wishlist if it doesn't exist and status is true
        wishlist = new Wishlistmodal({
          UserId,
          rooms: [{ roomId, status }],
        });
        await wishlist.save();
        return res.json({ msg: "Successfully added" });
      } else {
        return res
          .status(400)
          .json({ msg: "Wishlist not found, cannot remove" });
      }
    }

    const roomIndex = wishlist.rooms.findIndex((r) => r.roomId === roomId);

    if (status) {
      if (roomIndex === -1) {
        wishlist.rooms.push({ roomId, status });
      } else {
        wishlist.rooms[roomIndex].status = status;
      }
    } else {
      if (roomIndex !== -1) {
        wishlist.rooms.splice(roomIndex, 1);
        if (wishlist.rooms.length === 0) {
          await Wishlistmodal.deleteOne({ UserId });
          return res.json({ msg: "Wishlist cleared" });
        }
      } else {
        return res.status(400).json({ msg: "Room not found in wishlist" });
      }
    }

    await wishlist.save();
    res.json({ msg: status ? "Successfully updated" : "Successfully removed" });
  } catch (error) {
    console.error("Error during wishlist operation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findwishlist = async (req, res) => {
  try {
    const { UserId } = req.params;
    const wishlist = await Wishlistmodal.findOne({ UserId });

    if (!wishlist) {
      return res.status(404).json({
        msg: "Wishlist not found for the user",
        status: "error",
      });
    }

    res.json({
      msg: "Success",
      wishlist,
      count: wishlist.rooms.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

const findwishlistwithroomid = async (req, res) => {
  try {
    const { roomId } = req.params;
    const UserId = req.user.user._id;
    const wishlist = await Wishlistmodal.findOne({
      UserId,
    });

    if (!wishlist) {
      return res.json({
        status: "not found",
        msg: "Room not found in any wishlist",
      });
    }

    const room = wishlist.rooms.find((r) => r.roomId === roomId);
    if (room) {
      return res.json({
        msg: "Success",
        status: room.status,
      });
    }

    res.json({
      status: "not found",
      msg: "Room not found in wishlist",
    });
  } catch (error) {
    console.error("Error during fetching wishlist status:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const deletelist = async (req, res) => {
  try {
    const { roomId } = req.params;
    const UserId = req.user.user._id;
    const wishlist = await Wishlistmodal.findOne({
      UserId,
    });

    if (!wishlist) {
      return res.status(404).json({
        msg: "Wishlist not found",
      });
    }

    // Remove roomId from the array
    wishlist.rooms = wishlist.rooms.filter((r) => r.roomId !== roomId);

    // If no rooms remain, delete the wishlist
    if (wishlist.rooms.length === 0) {
      await Wishlistmodal.deleteOne({ _id: wishlist._id });
    } else {
      await wishlist.save();
    }

    res.json({
      msg: "Successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

module.exports = {
  postwistlist,
  findwishlistwithroomid,
  findwishlist,
  deletelist,
};
