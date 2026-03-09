import { NextResponse } from "next/server";
import { getCurrentAdminFromRequest } from "@/lib/auth/getCurrentAdmin";
import { hasPermission } from "@/lib/auth/hasPermission";

type ReferJoinRow = {
  name: string;
  companyName: string;
  joiningDate: string;
  status: string;
};

function convertRowsToCsv(rows: ReferJoinRow[]) {
  const header = ["Name", "Company Name", "Joining Date", "Status"];
  const lines = rows.map((row) => [
    row.name,
    row.companyName,
    row.joiningDate,
    row.status,
  ]);

  return [header, ...lines]
    .map((line) =>
      line
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");
}

export async function GET(request: Request) {
  try {
    const auth = await getCurrentAdminFromRequest(request);

    if (!auth) {
      return NextResponse.json(
        { success: false, message: "Invalid session" },
        { status: 401 }
      );
    }

    const { currentAdmin } = auth;

    if (!hasPermission(currentAdmin.permissions, "refer_earn.view:yes")) {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const download = searchParams.get("download") === "true";

    const rows: ReferJoinRow[] = [];

    if (download) {
      if (!hasPermission(currentAdmin.permissions, "refer_earn.download:yes")) {
        return NextResponse.json(
          { success: false, message: "Download access denied" },
          { status: 403 }
        );
      }

      const csv = convertRowsToCsv(rows);

      return new NextResponse(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="refer-earn-report-${currentAdmin.uid4}.csv"`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      rows,
      emptyState: rows.length === 0 ? "No joins yet" : null,
      note: "Referral joins table will become live once referredBy mapping is added in user models.",
    });
  } catch (error) {
    console.error("ADMIN_REFER_DATA_ERROR", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}